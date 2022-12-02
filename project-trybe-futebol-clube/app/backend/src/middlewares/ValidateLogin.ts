import { Request, Response, NextFunction } from 'express';

const emailValidate = (email: string): boolean => {
  const regexEmail = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/gim;
  const result = regexEmail.test(email);
  if (!result) return false;
  return true;
};

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
