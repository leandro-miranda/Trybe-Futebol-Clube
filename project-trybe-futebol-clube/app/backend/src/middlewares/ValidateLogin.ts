import { Request, Response, NextFunction } from 'express';

// Esta função verifica se um endereço de e-mail é válido usando uma expressão regular.
// Ela toma uma string como parâmetro e retorna true se o email for válido e false se não for.
const emailValidate = (email: string): boolean => {
  const regexEmail = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/gim;
  const result = regexEmail.test(email);
  if (!result) return false;
  return true;
};

// Esta função verifica se os campos email e password foram preenchidos, se o email é válido e se a senha tem pelo menos 6 caracteres.
// Se alguma dessas condições não for satisfeita, uma resposta apropriada é enviada ao usuário. Se todas as condições forem satisfeitas, o próximo middleware é chamado.
export default (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!password || !email) return res.status(400).json({ message: 'All fields must be filled' });
  if (!emailValidate(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  if (password.length < 6) {
    return res.status(422)
      .json({ messsage: '"password" length must be at least 6 characters long' });
  }

  next();
};
