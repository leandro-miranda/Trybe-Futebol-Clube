import * as bcrypt from 'bcryptjs';
import CustomError from '../error/CustomError';
import UserModel from '../database/models/user.model';
import IUser from '../interfaces/IUser';

class LoginService {
  public model = UserModel;

  public login = async (email: string, password: string):Promise<IUser | undefined> => {
    try {
      const resultUser = await this.model
        .findOne({ where: { email }, raw: true }) as IUser;

      const passBcrypt = await bcrypt.compare(password, resultUser.password);

      if (!passBcrypt) {
        throw new CustomError(401, 'Incorrect email or password');
      }
      return resultUser;
    } catch (error) {
      console.error(error);
    }
  };

  public getLoginValidate = async (userEmail: string) => {
    try {
      const role = await this.model
        .findOne({ where: { email: userEmail }, raw: true, attributes: ['role'] });

      return role;
    } catch (error) {
      console.log(error);
    }
  };
}

export default LoginService;
