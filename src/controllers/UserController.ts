import { getManager } from "typeorm";
import { User } from "../entities/User";

export class UserController {
  isUserExist = async (userPsid) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ psid: userPsid });
    console.log(user);
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  isFirstnameExist = async (userPsid) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ psid: userPsid });
    if (user?.firstName) {
      return true;
    } else {
      return false;
    }
  };

  isBirthdayExist = async (userPsid) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ psid: userPsid });
    if (user?.birthDate) {
      console.log("birthday exist");
      return true;
    }
    return false;
  };

  saveNewUser = async (body) => {
    const userRepository = getManager().getRepository(User);
    const save = await userRepository.save(body);
    if (save) {
      return true;
    } else {
      return false;
    }
  };

  getById = async (id) => {
    const messageRepository = getManager().getRepository(User);
    const user = await messageRepository.findOne({ psid: id });
    console.log(user?.birthDate);

    return user;
  };

  getBirthday = async (id) => {
    const messageRepository = getManager().getRepository(User);
    const user = await messageRepository.findOne({ psid: id });
    if (user) {
      return user.birthDate;
    } else {
      throw new Error("Cant find date");
    }
  };

  saveFirstName = async (userPsid: string, userFirstame) => {
    const userRepository = getManager().getRepository(User);
    if (this.isUserExist(userPsid)) {
      const update = await userRepository.update({ psid: userPsid }, { firstName: userFirstame });
      if (update) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  saveBirthday = async (userPsid: string, birthday) => {
    const userRepository = getManager().getRepository(User);
    console.log("DEBUG" + birthday);
    if (this.isUserExist(userPsid)) {
      await userRepository.update({ psid: userPsid }, { birthDate: birthday });
    }
  };
}
