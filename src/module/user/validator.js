import validator from 'validator';

const UserValidator = {
    validationSingUpParams: (user)=>{
        try {
            delete user.lastName;
            const listOfErros = [];

            if(!validator.isEmail(user.email != undefined ? user.email : '')){
                listOfErros.push({'field': 'email', 'value': user.email, 'errorMessage': 'The Email field is not formatted correctly.'});                
            }
              
            console.log(user)
            Object.keys(user).forEach((item) => {
                if(validator.isEmpty(user[item] != undefined ? user[item] : '')) {
                    listOfErros.push({'field': item, 'value': user[item], 'errorMessage': 'The field or value is required for registration'});
                }
            });
            
            if(listOfErros.length != 0) throw {'error': listOfErros};            
            
        } catch (error) {
            console.log("Error: " +  error);
            return error;
        }
    }
}

export default UserValidator;
