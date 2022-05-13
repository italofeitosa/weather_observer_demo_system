import WheatherObserverService from "../service";
import WheatherObserverValidator from "../validator";
import config from "../../../config";
const { HTTP_STATUS_OK, celsiusTemp } = config;

export default class WheatherObserverController {
  static getListCities = async (req, res) => {
    try {
      const { city, limit } = req.params;
      console.info("City:" + city);
      console.info("limit:" + limit);

      const validation = WheatherObserverValidator.validationParams({ city, limit });
      if(validation)  throw validation;

      const response = await WheatherObserverService.getListCitiesOpenWeather(city, limit);
      if (response.cod == "400") throw response;

      response.data.forEach(item => {
        delete item.local_names
      });
      
      return res.status(parseInt(HTTP_STATUS_OK)).json(response.data);

    } catch (error) {
      console.log(error);
      return res.status(parseInt(error.cod)).json(error);
    }
  };

  static getCurrentTempWeatherCity = async (req, res) => {
    try {
      const {lat, lon} = req.params;
      const unit = celsiusTemp;
      console.log("Latitude: " + lat);
      console.log("Longitude: " + lon);
      console.log("Unit: " + unit);

      const validation = WheatherObserverValidator.validationParams({lat, lon});
      if(validation)  throw validation;

      const response = await WheatherObserverService.getCurrentTempWeatherCityOpenWeather(lat, lon, unit);
      if(response.cod == '400') throw response;

      return res.status(parseInt(HTTP_STATUS_OK)).json(response.data);

    } catch (error) {
      console.log(error);
      return res.status(parseInt(error.cod)).json(error);
    }
  };
}
