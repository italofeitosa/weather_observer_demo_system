import WheatherObserverService from "../weather_observer/service";
import CityService from "../city/service";
import ReportService from "../report/service";
import config from "../../config";
import { Report } from "../report/entity/ReportEntity";
const {celsiusTemp} = config;

export default class CronJobConsultTemp {
  static consultTempCityObserver = async () => {
    try {
        console.log("*** Job CONSULT TEMP CITY OBSERVER is Running ***  - " + new Date().toLocaleTimeString());
        const listOfCities = await CityService.findAllCities();
        if (listOfCities.errmsg) throw listOfCities;

        listOfCities.forEach(async city => {
           console.log(city);
           const currentCityTemp = await WheatherObserverService.getCurrentTempWeatherCityOpenWeather(city.latitude, city.longitude, celsiusTemp);           
           if(currentCityTemp.cod == '400') return;

           const weatherData = currentCityTemp.data;
           const currentTemp = weatherData.main.temp;
           console.log("City Observed: " + city.name);
           console.log("Current Temp: " + currentTemp);
           console.log("Previous Temp: " + city.current_temp);
           if(city.current_temp != '') {
                let diffTemp = parseFloat(currentTemp) - parseFloat(city.current_temp);
                diffTemp = diffTemp > 0 ?  diffTemp : diffTemp * (-1);
                console.log("Diff Temp: " + diffTemp.toFixed(2));
                
                if(diffTemp >= city.variation_temp){
                    console.log("Report...");
                    const reportEntity = Object.assign(new Report(), {
                        city_name: city.name,
                        id_city: city.id,
                        email: city.email,
                        variation_temp: city.variation_temp,
                        current_temp: String(currentTemp),
                        diff_temp: String(diffTemp.toFixed(2)),
                        observe_date: new Date(new Date().getTime() - (3*60*60*1000)).toJSON(),              
                    });

                    const reportCreated = await ReportService.createReport(reportEntity);
                    if (reportCreated.errmsg) throw reportCreated;
                }
            }
            city.current_temp = String(currentTemp);
            const updateCity = await CityService.updateCity(city);
            if (updateCity.errmsg) return;
        });

        return true;

    } catch (error) {
        console.log(error);
    }
  };
    
}
