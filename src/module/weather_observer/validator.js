import validator from 'validator';

const WheatherObserverValidator = {
    validationListCitiesParams: (city) =>{
        try {            
            const listOfErros = [];              
            console.log(city);
            Object.keys(city).forEach((item) => {
                if(validator.isEmpty(city[item] != undefined ? city[item] : '')) {
                    listOfErros.push({'field': item, 'value': city[item], 'errorMessage': 'The field or value is required!'});
                }
            });
            
            if(listOfErros.length != 0) throw {'error': listOfErros};     
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default WheatherObserverValidator;