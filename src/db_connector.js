import { createConnection, MongoRepository } from "typeorm";
import { WeatherObserver } from "./module/weather_observer/entity/WeatherObserverEntity";
import config from "./config";
import { User } from "./module/user/entity/UserEntity";
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
      entities: [WeatherObserver, User], //[__dirname + "/**/*.entity{.ts,.js}"],
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
}
