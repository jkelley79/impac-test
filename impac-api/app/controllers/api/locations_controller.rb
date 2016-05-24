require 'httpclient'
class Api::LocationsController < ApplicationController
  respond_to :json
  include Impac
  include Gps


  def employees
    result, data = get_employee_locations

    if result
      points = Array.new
      data.each do |uuid, rank|
        lat, long, desc = get_random_location
        point = [lat, long, desc, rank]
        points.push(point)
      end
      respond_to do |format|
        msg = { :status => result, :points => points }
        format.json  { render :json => msg }
      end
    else
      respond_to do |format|
        msg = { :status => result }
        format.json  { render :json => msg }
      end
    end
  end

  def sales

    result, sales = get_sales_flow

    if result

      points = Array.new
      sales.each do |k, v|
        lat, long, desc = get_random_location
        point = [lat, long, desc, k, v]
        points.push(point)
      end

      respond_to do |format|
        msg = { :status => 'pass', :points => points }
        format.json  { render :json => msg }
      end
    else
      respond_to do |format|
        msg = { :status => result }
        format.json  { render :json => msg }
      end
    end

  end
end
