import { Application } from "express";
import WheatherController from "./controller/index.js";

const WheatherRouter = (app) => {
  //console.log(WheatherController.getListCities(req, res))
  app.get("/wheather/cities/:city/:limit", (req, res) => {
    WheatherController.getListCities(req, res);
  });

};

export default WheatherRouter;
