import { Application } from "express";
import res from "express/lib/response";
import WheatherController from "./controller/index.js";

const WheatherRouter = (app) => {
  
  app.get("/weather/cities/:city/:limit", (req, res) => {
    WheatherController.getListCities(req, res);
  });

  app.get("/weather/current/data/:lat/:lon/:unit", (req, res) =>{
    
  })

};

export default WheatherRouter;
