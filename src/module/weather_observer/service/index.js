import axios from "axios";
import config from "../../../config";

const WheatherObserverService = {

    getListCitiesOpenWeather: async (city, limit) =>{
        try {
            console.log('getListCitiesOpenWeather');            
            const { openWeatherHost, openWeatherAppId } = config;
            const url = `${openWeatherHost}geo/1.0/direct?q=${city}&limit=${limit}&appid=${openWeatherAppId}`;
            console.log(url);
            
            const response = await axios.get(url);

            return response;

        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    },

    getCurrentWeatherDataOpenWeather: async (lat, lon, units) => {
        try {
            console.log('getCurrentWeatherData');
            const { openWeatherHost, openWeatherAppId } = config;
            const url =  `${openWeatherHost}data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${openWeatherAppId}`;
            console.log(url);

            const response = await axios.get(url);            

            return response;
            
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }        
    }
}


export default WheatherObserverService;