module Impac
  URI_CONST = 'https://api-impac-uat.maestrano.io/api/v1/get_widget'
  HEADER_CONST = { 'Accept' => 'application/json',
                   'Authorization' => 'Basic NGVlNDczNmE3YTlmODc4ZTZkMDY3NzA5YjI5NTdmYTVhYTkxYjYyMGM4MzBkMzMyMzBmN2ZkYTA5OTI3MzFjNjowODg1YzllOC1hN2I2LTRiYjQtOGJiZC01MjQyOGExNDMwODc=' }

  def get_employee_locations
    client = HTTPClient.new
    query = 'engine=hr/employees_list&metadata[organization_ids][]=org-fc3l'

    begin
      result = client.get_content(URI_CONST, query, HEADER_CONST)
      data = JSON.parse(result, object_class: OpenStruct)
      # Pull the employees data out of the content response
      employees = data.content.employees

      # Track the number of locations that are common among employees
      location_count = Hash.new
      employees.each do |emp|
        emp.work_locations.each do |location|
          # see if the value is already existing and if not initialize it to 0
          val = location_count[location.work_location_id]
          if val == nil
            val = 0
          end
          location_count[location.work_location_id] = val + 1
        end
      end
    rescue HTTPClient::BadResponseError
        logger.warn 'Error getting response from the API'
        return false, 'Bad response'
    rescue JSON::ParserError
        logger.warn 'Issue parsing ', result
        return false, 'Parsing issue'
    else
        return true, location_count
    end
  end

  def get_sales_flow
    client = HTTPClient.new
    customer_query = 'engine=invoices/list&metadata[organization_ids][]=org-fc3l&metadata[entity]=customers'
    supplier_query = 'engine=invoices/list&metadata[organization_ids][]=org-fc3l&metadata[entity]=suppliers'
    begin
      # request and parse customer data
      cust_result = client.get_content(URI_CONST, customer_query, HEADER_CONST)
      cust_data = JSON.parse(cust_result, object_class: OpenStruct)

      # request and parse supplier data
      supp_result = client.get_content(URI_CONST, supplier_query, HEADER_CONST)
      supp_data = JSON.parse(supp_result, object_class: OpenStruct)

      # Customer invoices keyed off the name of them
      cust_invoices = Hash.new
      cust_data.content.entities.each do |ent|
        cust_invoices[ent.name] = ent.total_invoiced
      end

      # Supplier invoices are deductions for existing sales (if customers) or just losses
      supp_data.content.entities.each do |ent|
        if cust_invoices.key?(ent.name)
          cust_invoices[ent.name] = cust_invoices[ent.name] - ent.total_invoiced
        else
          cust_invoices[ent.name] = 0 - ent.total_invoiced
        end
      end

      # Sort the sales top to bottom
      cust_invoices = cust_invoices.sort_by{|k,v| v}

    rescue HTTPClient::BadResponseError
      logger.warn 'Error getting response from the API'
      return false, 'Bad response'
    rescue JSON::ParserError
      logger.warn 'Issue parsing ', result
      return false, 'Parsing issue'
    else
      return true, cust_invoices
    end
  end
end
