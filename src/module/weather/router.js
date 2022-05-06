import jwt from "jsonwebtoken";
import WheatherController from "./controller/index.js";
import config from "../../config.js";
const {secret} = config;

const WheatherRouter = (app) => {
  
  app.get("/weather/cities/:city/:limit", (req, res) => {
    verifyJWT(req, res, WheatherController.getListCities);    
  });

  app.get("/weather/current/data/:lat/:lon/:unit", (req, res) =>{
    
  });

  const verifyJWT = (req, res, nextFunction) =>{
    try {
      const token = req.headers['x-access-token'];
      console.log(token);
      console.log(secret);   
      if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
      }
      
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });        
        
        req.userId = decoded.id;
        nextFunction(req, res);
        
      });
      
    } catch (error) {
        console.log(error);
    }
  }

};

export default WheatherRouter;
