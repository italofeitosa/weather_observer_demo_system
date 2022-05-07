import jwt from "jsonwebtoken";
import DBConnector from "../../../db_connector";
import config from "../../../config";
const { secret } = config;

const AutheticationService = {
  signUser: (user, res) => {
    try {
      const payload = { email: user.email, sub: user.id };
      const newToken = jwt.sign(payload, secret, {
        expiresIn: 604800, // expires in 7 days
      });
      res.setHeader("token", newToken);
      res.setHeader("Access-Control-Allow-Headers", "true");
      res.setHeader("Access-Control-Expose-Headers", "token");
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  signUserVerify: async (email, password) => {
    try {
      const userRepository = await DBConnector.getUserRepository();
      const user = await userRepository
        .findOne({
          email: email,
        })
        .catch((error) => Promise.reject(error));

      if (user == undefined) throw AutheticationService.errorLogin();
      if (user.password != password) throw AutheticationService.errorLogin();

      return user;

    } catch (error) {
      console.log(error);
      return error;
    }
  },

  unauthorize: async (res, error) => {
    try {
      return res.status(422).json(error);

    } catch (error) {
      console.log(error);
      return error;
    }
  },

  errorLogin: () =>{
    return { error: "These credentials do not match our records." };
  },
};

export default AutheticationService;
