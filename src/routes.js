import userRouter from "./module/user/router";
import wheatherObserverRouter from "./module/weather_observer/router";
import authRouter from "./module/authentication/router";
import cityRouter from "./module/city/router";
import reportRouter from "./module/report/router";

const Routes = {
  setupRoutes: (app) => {
    userRouter(app);
    authRouter(app);
    cityRouter(app);
    reportRouter(app);
    wheatherObserverRouter(app);

    app.get("/health", (req, resp) => resp.sendStatus(200));

    app.get("/", (req, resp) =>
      resp.send("Whether Observer Demo System backend is running.")
    );

    app.all("*", (req, resp) =>
      resp.status(404).send({ ERROR: true, message: "Check your URL please." })
    );
  },
};

export default Routes;
