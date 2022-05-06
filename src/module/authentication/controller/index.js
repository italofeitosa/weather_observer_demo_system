import AutheticationService from "../service";
import config from "../../../config";
const { HTTP_STATUS_OK } = config;

export default class AuthenticationController {
    static login = async (req, res) =>{
        try {
            const user ={
                email:'italoa.feitosa@gmail.com',
                id: '62745e26d76cf8155060ecb5'
            }

            console.log(req.body);
            AutheticationService.signUser(user, res);

            return res.status(parseInt(HTTP_STATUS_OK)).send("Token Genarate");

        } catch (error) {
            AutheticationService.unauthorize(res, error);
        }
    }
}