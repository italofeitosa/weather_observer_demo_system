import { Application, Request, Response } from "express";

const Routes = {
  setupRoutes: (app) => {
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