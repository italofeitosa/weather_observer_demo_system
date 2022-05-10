import Server from './server';
import DBConnector from './db_connector';
import { WeatherObserver } from './module/weather_observer/entity/WeatherObserverEntity'; 
//import { User } from './module/user/entity/UserEntity';
import config from "./config";
import { User } from './module/user/entity/UserEntity';


DBConnector.createConnection().then(async () => {
    try {       
        console.log("DB started...");
        //const weatherRepository = await DBConnector.getWeatherRepository();   
        /* await weatherRepository.save({city: "Fortaleza", latitude: "-3.7304512", longitude: "-38.5217989"}).then(weather => {
            console.log("Weather has been saved: ", weather)
        }).catch((error) => Promise.reject(error)); */

    /*  await weatherRepository.find().then(weather => {
            console.log("Weather has been find: ", weather)
        }).catch((error) => Promise.reject(error)); */    

        //const teste = await weatherRepository.find({where:{}});
        //const teste = await weatherRepository.find();
        //console.log(teste);

        Server.start();
    } catch (error) {
        console.log(error);
    }
});