import jwt from "jsonwebtoken";
import DBConnector from "../../../db_connector";
import config from "../../../config";
const { secret, timeExpires } = config;

const AutheticationService = {
  signUser: (user, res) => {
    try {
      console.log("signUser...");
      console.log(timeExpires);
      const payload = { email: user.email, sub: user.id };
      const newToken = jwt.sign(payload, secret, {
        expiresIn: parseInt(timeExpires), // expires in 1 hour
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
      console.log("signUserVerify...");
      const userRepository = await DBConnector.getUserRepository();
      const user = await userRepository
        .findOne({
          email: email,
        })
        .catch((error) => Promise.reject(error));

      if (!user) throw AutheticationService.errorLogin();

      return user
        .verifyIsSamePassword(password)
        .then(() => user)
        .catch((error) => {
          return Promise.reject(AutheticationService.errorLogin());
        });

    } catch (error) {
      console.log(error);
      return error;
    }
  },

  unauthorize: async (res, error) => {
    console.log("unauthorize...");
    try {
      return res.status(422).json(error);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  errorLogin: () => {
    return { error: "These credentials do not match our records." };
  },
};

export default AutheticationService;
