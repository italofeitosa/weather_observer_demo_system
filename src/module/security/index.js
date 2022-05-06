import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../../config";
const {secret} = config;

export default class Security {
  static encrypt = (value, salt) => {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(value, salt, 1000, 64, "sha512", (err, derivedKey) => {
        if (err) return reject(err);
        const hash = derivedKey.toString("hex");
        resolve(hash);
      });
    });
  };

  static verifyJWT = (req, res, next) =>{
    try {
      const token = req.headers['x-access-token'];
      console.log(token);
      console.log(secret);   
      if(!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
      }
      
      jwt.verify(token, secret, (err, decoded) => {
        if(err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });        
        
        req.userId = decoded.id;

        next();        
      });
      
    } catch (error) {
        console.log(error);
    }
  }

}
