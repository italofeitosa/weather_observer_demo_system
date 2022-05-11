import { createConnection, MongoRepository } from "typeorm";
import { WeatherObserver } from "./module/weather_observer/entity/WeatherObserverEntity";
import { User } from "./module/user/entity/UserEntity";
import { City } from "./module/city/entity/CityEntity";
import { Report } from "./module/report/entity/ReportEntity";
import config from "./config";
const { database, databaseUrl } = config

export default class DBConnector {
  static connector;
  

  static getConnector = async () => {
    if (!DBConnector.connector) {
      return DBConnector.createConnection().catch((error) =>
        Promise.reject(error)
      );
    }

    return DBConnector.connector;
  };

  static createConnection = async () => {
    const mongoURL = String(databaseUrl);
    const databaseType = String(database);
    return createConnection({
      type: databaseType,
      synchronize: true,
      url: mongoURL,
      entities: [WeatherObserver, User, City, Report], //[__dirname + "/**/*.entity{.ts,.js}"],
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
      .then((connector) => {
        DBConnector.connector = connector;
        return DBConnector.connector;
      })
      .catch((error) => Promise.reject(error));
  };

  static getWeatherObserverRepository = async () => {
    return DBConnector.getConnector()
      .then((connector) => {
        return connector.getMongoRepository(WeatherObserver);       
      })
      .catch((error) => Promise.reject(error));
  };

  static getUserRepository = async () => {
    return DBConnector.getConnector()
      .then((connector) => {
        return connector.getMongoRepository(User);       
      })
      .catch((error) => Promise.reject(error));
  };

  static getCityRepository = async () => {
    return DBConnector.getConnector()
      .then((connector) => {
        return connector.getMongoRepository(City);       
      })
      .catch((error) => Promise.reject(error));
  };

  static getReportRepository = async () => {
    return DBConnector.getConnector()
      .then((connector) => {
        return connector.getMongoRepository(Report);       
      })
      .catch((error) => Promise.reject(error));
  };
}
