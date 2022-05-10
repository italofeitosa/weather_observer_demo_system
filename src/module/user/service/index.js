import DBConnector from "../../../db_connector";
import { User } from "../entity/UserEntity";

const UserService = {
  createUser: async (user) => {
    try {
      console.log('createUser...');
      const userRepository = await DBConnector.getUserRepository();
      const userEntity =  Object.assign(new User(), {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        password: user.password,
      });
      const userCreate = await userRepository
        .save(userEntity)
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
