import { getManager } from 'typeorm';
import { User } from '../entities/User';

export class UserController {
  async isUserExist(userPsid) {
    const userRepository = getManager().getRepository(User);
    const user = userRepository.findOne({ psid: userPsid });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async isFirstnameExist(userPsid) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ psid: userPsid });
    if (user?.firstName) {
      return true;
    } else {
      return false;
    }
  }

  async isBirthdayExist(userPsid) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ psid: userPsid });
    if (user?.birthDate) {
      return true;
    }
    return false;
  }

  async saveNewUser(body) {
    const userRepository = getManager().getRepository(User);
    await userRepository.save(body);
  }

  async getById(id) {
    const messageRepository = getManager().getRepository(User);
    const user = await messageRepository.findOne({ psid: id });
    console.log(user?.birthDate);

    return user;
  }

  async saveFirstName(userPsid: string, firstname) {
    const userRepository = getManager().getRepository(User);
    if (this.isUserExist(userPsid)) {
      await userRepository.update(userPsid, { firstName: firstname });
    }
  }

  async saveBirthday(userPsid: string, birthday) {
    const userRepository = getManager().getRepository(User);
    if (this.isUserExist(userPsid)) {
      await userRepository.update(userPsid, { birthDate: birthday });
    }
  }
}
