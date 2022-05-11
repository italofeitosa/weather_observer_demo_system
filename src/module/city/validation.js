import validator from 'validator';
import DBConnector from '../../db_connector';

const CityValidation = {
    validationCreateObserverCityParams : async (city) =>{
        try {                
            console.log(city);
            const listOfErros = CityValidation.checkParamsRequired(city);
            
            if(listOfErros.length != 0) throw {'error': listOfErros};
            
            const cityRepository = await DBConnector.getCityRepository();
            const cityFind = await cityRepository.find({
                email: city.email,
                name: city.name
            });

            console.log(cityFind.length);

            if(cityFind.length > 0) throw {"errorMessage": "City: " + city.name + ' is registered for email: ' + city.email + ""}
            
        } catch (error) {
            console.log("Error: " +  error);
            return error;
        }
    },

    validatationFindCityByEmailParms: (city) => {
        try {
            const listOfErros = CityValidation.checkParamsRequired(city);
            if(!validator.isEmail(city.email != undefined ? city.email : '')){
                listOfErros.push({'field': 'email', 'value': city.email, 'errorMessage': 'The Email field is not formatted correctly.'});
            }

            if(listOfErros.length != 0) throw {'error': listOfErros};

        } catch (error) {
            console.log("Error: " +  error);
            return error;
        }
    },

    validataitonDeleteCityParams: (city) => {
        try {
            const listOfErros = CityValidation.checkParamsRequired(city);
            if(listOfErros.length != 0) throw {'error': listOfErros};
            
        } catch (error) {
            console.log("Error: " +  error);
            return error;
        }
    },

    checkParamsRequired: (obj) => {
        try {
            const listOfErros = [];

            Object.keys(obj).forEach((item) => {
                if(validator.isEmpty(obj[item] != undefined ? obj[item] : '')) {
                    listOfErros.push({'field': item, 'value': obj[item], 'errorMessage': 'The field or value is required for registration city.'});
                }
            });

            return listOfErros;
            
        } catch (error) {
            console.log("Error: " +  error);
            return error;
        }
    }


}

export default CityValidation;
