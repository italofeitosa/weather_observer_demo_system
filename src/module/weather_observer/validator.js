import validator from 'validator';

const WheatherObserverValidator = {
    validationParams: (city) =>{
        try {            
            console.log(city);
            const listOfErros = WheatherObserverValidator.heckParamsRequired(city);                   
            
            if(listOfErros.length != 0) throw {'error': listOfErros};     

        } catch (error) {
            console.log(error);
            return error;
        }
    },

    heckParamsRequired: (obj) => {
        try {
            const listOfErros = [];

            Object.keys(obj).forEach((item) => {
                if(validator.isEmpty(obj[item] != undefined ? obj[item] : '')) {
                    listOfErros.push({'field': item, 'value': obj[item], 'errorMessage': 'The field or value is required!'});
                }
            });

            return listOfErros;
            
        } catch (error) {
            console.log("Error: " +  error);
            return error;
        }
    }
}

export default WheatherObserverValidator;