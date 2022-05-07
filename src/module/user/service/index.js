import DBConnector from "../../../db_connector";

const UserService = {
  createUser: async (user) => {
    try {
      const userRepository = await DBConnector.getUserRepository();
      const userCreate = await userRepository
        .save({
          email: user.email,
          name: user.name,
          password: user.password,
        })
        .then((user) => {
          console.log("User has been Created: ", user);
          return user;
        })
        .catch((error) => Promise.reject(error));

        return userCreate;

    } catch (error) {
        console.log(error.writeErrors);
        return error.writeErrors[0];
    }
  },
};

export default UserService;
