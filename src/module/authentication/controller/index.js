import AutheticationService from "../service";
import AuthenticationValidator from "../validator";
import config from "../../../config";
const { HTTP_STATUS_OK } = config;

export default class AuthenticationController {
    static login = async (req, res) =>{
        try {
            console.log("login...");
            const { email, password } = req.body;

            const validation = AuthenticationValidator.validationLoginParams({ email, password });
            if(validation) throw validation;

            const user = await AutheticationService.signUserVerify(email, password);            

            if(user.error)  throw user;

            AutheticationService.signUser(user, res);

            return res.status(parseInt(HTTP_STATUS_OK)).json({login:"ok", token: "Token Generated in Header"});

        } catch (error) {
            AutheticationService.unauthorize(res, error);
        }
    }

    static logout = async (req, res) => {
        try {
            res.setHeader("token", "Token Expired...");
            res.setHeader("Access-Control-Allow-Headers", "true");
            res.setHeader("Access-Control-Expose-Headers", "token");

            return res.status(200).json({logout: "ok", token: "Token Expired..."});
            
        } catch (error) {
            return res.status(401).json(error);
        }
    }
}