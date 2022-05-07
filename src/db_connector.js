import { createConnection, MongoRepository } from "typeorm";
import { Weather } from "./module/weather/entity/WeatherEntity";
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
      entities: [Weather, User], //[__dirname + "/**/*.entity{.ts,.js}"],
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
      .then((connector) => {
        DBConnector.connector = connector;
        return DBConnector.connector;
      })
      .catch((error) => Promise.reject(error));
  };

  static getWeatherRepository = async () => {
    return DBConnector.getConnector()
      .then((connector) => {
        return connector.getMongoRepository(Weather);       
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
