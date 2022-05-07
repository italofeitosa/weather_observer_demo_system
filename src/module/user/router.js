import UserController from "./controller";

const UserRouter = (app) => {
    app.post('/user/singup', UserController.singUp);
};

export default UserRouter;
