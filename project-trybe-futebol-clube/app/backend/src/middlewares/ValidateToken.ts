import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

// Essa função recebe um objeto como parâmetro e retorna um token JWT criado com o objeto passado como parâmetro e uma chave secreta.
// A chave secreta pode ser fornecida como parâmetro ou, caso não seja informada, será definida como 'senhaSecreta'.
const JWT_SECRET = process.env.JWT_SECRET || 'senhaSecreta';

const jwtCreate = (payload: object): string => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

// Essa função tem como objetivo validar o token de autenticação JWT. Ela obtém o token do cabeçalho da solicitação, verifica se existe um token e, se sim,
// verifica se ele é válido usando a criptografia JWT_SECRET. Se for válido, o token é decodificado e as informações do usuário são anexadas à solicitação para uso posterior.
const jwtValidate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { jwtCreate, jwtValidate };
