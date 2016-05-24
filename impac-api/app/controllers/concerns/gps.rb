module Gps

  GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
  GOOGLE_API_KEY = 'AIzaSyAZSBDQX-iRTFg_e4I2qOSBC-BL4bIJZ6k'

  # Box between -20 - -32, 120 - 150 (Australia)
  def get_random_location
    lat = 0 - rand(20..32)
    lng = rand(120..150)

    # Location lookup via Google
    success, desc = translate_to_location(lat, lng)
    if success == false or desc == ''
      desc = 'Page the dev team'
    end
    return lat, lng, desc
  end

  def translate_to_location(lat, lng)
    client = HTTPClient.new
    query = "latlng=#{lat.to_s},#{lng.to_s}&key=#{GOOGLE_API_KEY}"
    val = ''
    begin
      result = client.get_content(GOOGLE_API_URL, query)
      data = JSON.parse(result, object_class: OpenStruct)
      results = data.results
      results.each do |r|
        # Only look for the locality & political result
        if r.types.include? 'locality' and r.types.include? 'political'
          val = r.formatted_address
        end
      end
    rescue HTTPClient::BadResponseError
      logger.warn 'Error getting response from the API ... did we pay the Google bill?'
      return false, val
    rescue JSON::ParserError
      logger.warn 'Issue parsing ', data
      return false, val
    else
      return true, val
    end
  end
end