import CityValidation from "../validation";
import CityService from "../service";
import config from "../../../config";
const { HTTP_STATUS_OK } = config;

export default class CityController {
  static createObserverCity = async (req, res) => {
    try {
      const { name, latitude, longitude, country, state, email, variation_temp  } = req.body;
      const validation =
        await CityValidation.validationCreateObserverCityParams({
          name,
          latitude,
          longitude,
          email,
          variation_temp,
        });
      if (validation) throw validation;

      const cityCreated = await CityService.createCity({
        name,
        latitude,
        longitude,
        country,
        state,
        email,
        variation_temp,
      });
      if (cityCreated.errmsg) throw cityCreated;

      return res.status(parseInt(HTTP_STATUS_OK)).json(cityCreated);
    } catch (error) {
      console.log(error);
      return res.status(parseInt(400)).json(error);
    }
  };

  static findCityByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const validation = CityValidation.validatationFindCityByEmailParms({email});
      if (validation) throw validation;

      const listCityObserver = await CityService.getFindAllCityByEmail(email);
      if (listCityObserver.errmsg) throw listCityObserver;
      
      return res.status(parseInt(HTTP_STATUS_OK)).json(listCityObserver);

    } catch (error) {
      console.log(error);
      return res.status(parseInt(400)).json(error);
    }
  };

  static deleteCity = async (req, res) => {
    try {
      const { id } =  req.params;
      const validation = CityValidation.validataitonDeleteCityParams({id});      
      if (validation) throw validation;
      
      const cityDeleted = await CityService.deleteById(id);      
      if (cityDeleted.errmsg) throw cityDeleted;

      return res.status(parseInt(HTTP_STATUS_OK)).json({delete: "ok", message: "The observed city has been deleted.", message_report: cityDeleted.messageReport});

    } catch (error) {
      console.log(error);
      return res.status(parseInt(400)).json(error);
    }    
  };
}
