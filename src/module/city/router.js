import CityController from "./controller";
import Security from "../security";

const CityRouter = (app) => {
    app.get('/city/list/observercity/:email', Security.verifyJWT, CityController.findCityByEmail);

    app.post('/city/observercity', Security.verifyJWT, CityController.createObserverCity);

    app.delete('/city/:id', Security.verifyJWT, CityController.deleteCity);
};

export default CityRouter;