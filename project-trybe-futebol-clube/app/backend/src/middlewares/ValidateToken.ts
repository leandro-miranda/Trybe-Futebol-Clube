import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'senhaSecreta';

const jwtCreate = (payload: object): string => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

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
