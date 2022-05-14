import UserController from "./controller";

const UserRouter = (app) => {
    app.post('/user/signup', UserController.signUp);
};

export default UserRouter;
