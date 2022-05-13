import validator from 'validator';

const ReportValidator = {
    validationReportByCityParams: (report) =>{
        try {
            const listOfErros = ReportValidator.checkParamsRequired(report);
            if(!validator.isEmail(report.email != undefined ? report.email : '')){
                listOfErros.push({'field': 'email', 'value': report.email, 'errorMessage': 'The Email field is not formatted correctly.'});
            }

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

export default ReportValidator;
