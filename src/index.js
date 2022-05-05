import Server from './server';
import DBConnector from './db_connector';
import { Weather } from './module/weather/entity/WeatherEntity';
import config from "./config";


DBConnector.createConnection().then(async () => {
    console.log("DB started...");
    const weatherRepository = await DBConnector.getWeatherRepository();
   
    /* await weatherRepository.save({city: "Barro", latitude: "-3.7304512", longitude: "-38.5217989"}).then(weather => {
        console.log("Weather has been saved: ", weather)
    }).catch((error) => Promise.reject(error)); */

    await weatherRepository.find().then(weather => {
        console.log("Weather has been find: ", weather)
    }).catch((error) => Promise.reject(error));    

    const {databaseUrl} = config;
    console.log(databaseUrl);

    Server.start();
});