import jwt from "jsonwebtoken";
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
        //TODO
    }
  },
};

export default AutheticationService;
