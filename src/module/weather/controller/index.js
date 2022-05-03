import { Response, Request } from "express";
import WheatherService from "../service";
//import WheatherValidator from "../validator";

export default class WheatherController {
  static getListCities = async (req, res) => {
    try {
      let { city, limit } = req.params;
      console.info("Cidade:" + city);
      console.info("limit:" + limit);
      /* WheatherValidator.validationListCitiesParams({
          city,
          limit,
        }); */

      const response = await WheatherService.getListCitiesOpenWeather(city, limit);

      if (response.cod == "400") throw response;

      return res.status(200).json(response.data);

      //TODO já funciona
      /* return WheatherService.getListCitiesOpenWeather(city, limit)
        .then((wheather) => {
          console.log(JSON.stringify(wheather.data));
          return res.status(200).json(wheather.data);
        })
        .catch((error) => {
          res.status(400).send("ERROR: " + error);
        }); */

    } catch (error) {
      //handleApiError(error, res);
      console.log(error);
      return res.status(parseInt(error.cod)).json(error);
    }
  };
}
