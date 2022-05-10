import WheatherObserverService from "../service";
import WheatherObserverValidator from "../validator";

export default class WheatherObserverController {
  static getListCities = async (req, res) => {
    try {
      const { city, limit } = req.params;
      console.info("City:" + city);
      console.info("limit:" + limit);

      const validation = WheatherObserverValidator.validationListCitiesParams({ city, limit });
      if(validation)  throw validation;

      const response = await WheatherObserverService.getListCitiesOpenWeather(city, limit);

      if (response.cod == "400") throw response;

      return res.status(200).json(response.data);

    } catch (error) {
      console.log(error);
      return res.status(parseInt(error.cod)).json(error);
    }
  };

  static getCurrentWeatherData = async (req, res) => {
    try {
      const {lat, lon, unit} = req.params;
      console.log("Latitude: " + lat);
      console.log("Longitude: " + lon);
      console.log("Unit: " + unit);

      const response = await WheatherObserverService.getCurrentWeatherDataOpenWeather(lat, lon, unit);

      if(response.cod == '400') throw response;

      return res.status(200).json(response.data);

    } catch (error) {
      console.log(error);
      return res.status(parseInt(error.cod)).json(error);
    }
  };
}
