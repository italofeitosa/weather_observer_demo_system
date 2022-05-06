import AuthenticationController from "./controller";
//import basicAuth from 'express-basic-auth';

const AuthRouter = (app) => {
  //app.use(basicAuth({ users: { admin: "admin" } }));
  app.post("/auth/login", (req, res) => {
    AuthenticationController.login(req, res);
  });
};

export default AuthRouter;
