import axios from "axios";

const appId = '922efd15ff56ad066584da88f2dacf5b';
const WheatherService = {
    
    getListCitiesOpenWeather: async (city, limit) =>{
        try {
            console.log('getListCitiesOpenWeather');            
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${appId}`;
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
            const url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appId}`;
            console.log(url);

            const response = await axios.get(url);            

            return response;
            
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }        
    }
}


export default WheatherService;