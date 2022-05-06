import WheatherController from "./controller/index.js";
import Security from "../security/index.js";


const WheatherRouter = (app) => {
  
  app.get("/weather/cities/:city/:limit", Security.verifyJWT, WheatherController.getListCities);

  app.get("/weather/current/data/:lat/:lon/:unit", (req, res) =>{
    
  });
};

export default WheatherRouter;
