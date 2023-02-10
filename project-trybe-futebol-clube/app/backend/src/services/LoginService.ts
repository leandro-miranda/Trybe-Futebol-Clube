import * as bcrypt from 'bcryptjs';
import CustomError from '../error/CustomError';
import UserModel from '../database/models/user.model';
import IUser from '../interfaces/IUser';

class LoginService {
  public model = UserModel;

  // Esta função é uma função de login que aceita um endereço de e-mail e uma senha como argumentos. Ela procura o usuário no banco de dados usando o e-mail.
  // Em seguida, usa o bcrypt para verificar se a senha fornecida pelo usuário corresponde à senha armazenada no banco de dados.
  // Se a senha não corresponder, uma exceção será lançada. Se a senha estiver correta, os dados do usuário serão retornados.
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

  // Essa função busca no banco de dados um dado específico, no caso o role de um usuário dado o seu email. Ela retorna o role como resultado.
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
