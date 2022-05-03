import express, { Application, Server } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Routes from "./routes";

const ApplicationServer = {
  start: () => {
    const port = process.env.PORT || 3000;
    const app = express();
    ApplicationServer.config(app);
    Routes.setupRoutes(app);

    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
    process.once("SIGINT", () => ApplicationServer.close(server));
    process.once("SIGTERM", () => ApplicationServer.close(server));

    return app;
  },

  config: (app) => {
    const allowedOrgins = ["http://localhost/"];

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(
      cors({
        origin: (origin, call) => {
          if (!origin) return call(null, true);

          if (!allowedOrgins.includes(origin)) {
            const msg = "Is not permission from IP Request: " + origin;

            return call(new Error(msg), false);
          }

          return call(null, true);
        },
      })
    );
  },

  close: (server) => {
    server.close(() => console.info("Application Server was closed."));
  },
};

export default ApplicationServer;
