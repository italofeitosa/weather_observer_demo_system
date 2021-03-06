import DBConnector from "../../../db_connector";
import ReportService from "../../report/service";

const CityService = {
  createCity: async (city) => {
    try {
      console.log("createCity...");
      const cityRepository = await DBConnector.getCityRepository();
      const cityCreated = cityRepository
        .save({
          name: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
          country: city.country,
          state: city.state,
          email: city.email,
          variation_temp: city.variation_temp,
        })
        .then((city) => {
          console.log("City has been Created: ", city);
          return city;
        })
        .catch((error) => Promise.reject(error));

      return cityCreated;
      
    } catch (error) {
      console.log(error.writeErrors);
      return error.writeErrors[0];
    }
  },

  updateCity: async (city) => {
    try {
      console.log("updateCity...");
      const cityRepository = await DBConnector.getCityRepository();
      const updateCity = cityRepository
        .save(city)
        .then((city) => {
          console.log("The city has been updated: ", city);
          return city;
        })
        .catch((error) => Promise.reject(error));

      return updateCity;

    } catch (error) {
      console.log(error.writeErrors);
      return error.writeErrors[0];
    }
  },

  getFindAllCityByEmail: async (email) => {
    try {
      console.log("getFindAllCityByEmail...");
      const cityRepository = await DBConnector.getCityRepository();
      const listOfCities = await cityRepository
        .find({
          email: email,
        })
        .then((cities) => {
          return cities;
        })
        .catch((error) => Promise.reject(error));

      return listOfCities;

    } catch (error) {
      console.log(error.writeErrors);
      return error.writeErrors[0];
    }
  },

  findAllCities: async () => {
    try {
      console.log("findAllCities...");
      const cityRepository = await DBConnector.getCityRepository();

      const listOfCities = await cityRepository
        .find()
        .then((listCities) => {
          return listCities;
        })
        .catch((error) => Promise.reject(error));

      return listOfCities;

    } catch (error) {
      console.log(error.writeErrors);
      return error.writeErrors[0];
    }
  },

  deleteById: async (id) => {
    try {
      console.log("deleteById...");
      const cityRepository = await DBConnector.getCityRepository();
      const cityDeleted = await cityRepository
        .delete(id)
        .then((cityDeleted) => {
          return cityDeleted;
        })
        .catch((error) => Promise.reject(error));        

      if (cityDeleted.affected == 0) {
        throw {
          writeErrors: [
            { errmsg: { affected: "There is no city to delete!" } },
          ],
        };
      }

      const reportDeleted = await ReportService.deleteById(id);
      const messageReport = "Delete Report: " + reportDeleted.delete + " - " + reportDeleted.message;
      console.log(messageReport);
      cityDeleted.messageReport = messageReport;

      return cityDeleted;

    } catch (error) {
      console.log(error.writeErrors);
      return error.writeErrors[0];
    }
  },
};

export default CityService;
