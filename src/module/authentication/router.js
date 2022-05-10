import Security from "../security";
import AuthenticationController from "./controller";
//import basicAuth from 'express-basic-auth';

const AuthRouter = (app) => {
  //app.use(basicAuth({ users: { admin: "admin" } }));
  app.post("/auth/login", AuthenticationController.login);  

  app.post("/auth/logout", Security.verifyJWT, AuthenticationController.logout);

};

export default AuthRouter;
