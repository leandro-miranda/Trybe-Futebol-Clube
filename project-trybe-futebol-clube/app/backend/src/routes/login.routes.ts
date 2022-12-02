import { Router } from 'express';
import { jwtValidate } from '../middlewares/ValidateToken';
import LoginController from '../controllers/loginController';
import ValidateLogin from '../middlewares/ValidateLogin';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post('/', ValidateLogin, loginController.Login);
loginRouter.get('/validate', jwtValidate, loginController.Validate);

export default loginRouter;
