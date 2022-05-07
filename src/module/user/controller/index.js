import { User } from "../entity/UserEntity";
import UserService from "../service";
import AutheticationService from "../../authentication/service";
import config from "../../../config";
const { HTTP_STATUS_OK } = config;

export default class UserController {
  static singUp = async (req, res) => {
    try {
        const {email, name, password} = req.body;

        console.log("email: " + email);
        console.log("name: " + name);
        console.log("password: " + password);

        const user = new User;
        user.email = email;
        user.name = name;
        user.password = password;

        const userCreate = await UserService.createUser(user);
        if(userCreate.errmsg) throw userCreate;

        delete userCreate.password;
        AutheticationService.signUser(userCreate, res);

        return res.status(parseInt(HTTP_STATUS_OK)).json(userCreate);
        
    } catch (error) {
        console.log(error);
        return res.status(parseInt(400)).json(error);
    }
  };
}
