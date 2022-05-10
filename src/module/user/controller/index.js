import UserService from "../service";
import AutheticationService from "../../authentication/service";
import UserValidator from "../validator";
import config from "../../../config";
const { HTTP_STATUS_OK } = config;

export default class UserController {
  static singUp = async (req, res) => {
    try {
        const {email, name, lastName, password} = req.body;
        
        const validation = UserValidator.validationSingUpParams({email, name, lastName, password});
        if(validation)  throw validation;

        const userCreate = await UserService.createUser({email, name, lastName, password});
        if(userCreate.errmsg) throw userCreate;

        delete userCreate.password;
        delete userCreate.passwordHashSalt;
        AutheticationService.signUser(userCreate, res);

        return res.status(parseInt(HTTP_STATUS_OK)).json(userCreate);
        
    } catch (error) {
        console.log(error);
        return res.status(parseInt(400)).json(error);
    }
  };
}
