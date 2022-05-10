import Server from './server';
import DBConnector from './db_connector';
import { WeatherObserver } from './module/weather_observer/entity/WeatherObserverEntity'; 
//import { User } from './module/user/entity/UserEntity';
import config from "./config";
import { User } from './module/user/entity/UserEntity';
import { ObjectID, ObjectIdColumn } from 'typeorm';


DBConnector.createConnection().then(async () => {
    try {       
        console.log("DB started...");
        //const weatherObserverRepository = await DBConnector.getWeatherObserverRepository();   
        /* await weatherObserverRepository.save({id: ObjectID('6279dab71d7aa2424c7db8c9'), current_temp: "25.99", previous_temp: "", temp_max: "25.99", temp_min: "25.61",
         temp_max_variaton: "24.00", temp_min_variaton: "23.00", id_city: "6279a6576654bc185c01e3bf" }).then(weather => {
            console.log("Weather has been saved: ", weather)
        }).catch((error) => Promise.reject(error)); */

        /* const watherObserver = await weatherObserverRepository.findOne({
            id: ObjectIdColumn('6279dab71d7aa2424c7db8c9'),
        })
        console.log(watherObserver.id);
        watherObserver.previous_temp = "28.01"
        await weatherObserverRepository.save(watherObserver); */
        
    /*  await weatherObserverRepository.find().then(weather => {
            console.log("Weather has been find: ", weather)
        }).catch((error) => Promise.reject(error)); */    

        //const teste = await weatherObserverRepository.find({where:{}});
        //const teste = await weatherObserverRepository.find();
        //console.log(teste);

        Server.start();
    } catch (error) {
        console.log(error);
    }
});