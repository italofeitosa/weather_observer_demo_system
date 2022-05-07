import AutheticationService from "../service";
import config from "../../../config";
const { HTTP_STATUS_OK } = config;

export default class AuthenticationController {
    static login = async (req, res) =>{
        try {
            console.log("login...");
            const { email, password } = req.body;
            const user = await AutheticationService.signUserVerify(email, password);            

            if(user.error)  throw user;

            AutheticationService.signUser(user, res);

            return res.status(parseInt(HTTP_STATUS_OK)).send("Token Genarate");

        } catch (error) {
            AutheticationService.unauthorize(res, error);
        }
    }
}