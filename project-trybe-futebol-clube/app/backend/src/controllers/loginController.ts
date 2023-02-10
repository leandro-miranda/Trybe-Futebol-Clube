import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { jwtCreate } from '../middlewares/ValidateToken';

class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  // Esse código é responsável por controlar a autenticação de um usuário. Ele recebe um email e senha do usuário e usa essa informação para verificar
  // se o usuário existe no banco de dados. Se o usuário for encontrado, uma token de autenticação é gerada com as informações do usuário e é retornada para o usuário.
  public Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userToken = await this.service.login(email, password);

    if (!userToken) return res.status(401).json({ message: 'Incorrect email or password' });

    const { id, username, role } = userToken;
    const token = jwtCreate({ id, username, role });

    return res.status(200).json({ token });
  };

  // Esse código tem como objetivo validar o papel de um usuário. A partir do corpo da requisição (req.body.user),
  // é recuperado o atributo "role" e retornado em uma resposta (res.status) com o status de sucesso (200) e o atributo role.
  public Validate = async (req: Request, res: Response) => {
    const { role } = req.body.user;
    return res.status(200).json({ role });
  };
}

export default LoginController;
