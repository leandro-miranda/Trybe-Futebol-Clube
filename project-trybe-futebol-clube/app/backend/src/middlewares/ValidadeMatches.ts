import { Request, Response, NextFunction } from 'express';

// O código acima verifica se as equipes presentes no corpo da solicitação são iguais, e caso sejam,
// retorna uma resposta inválida (HTTP status 422) informando que não é possível criar um jogo com duas equipes iguais.
// Caso as equipes sejam diferentes, o próximo middleware é executado.
const validateMatches = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res
      .status(422)
      .json({
        message: 'It is not possible to create a match with two equal teams',
      });
  }
  next();
};

export default validateMatches;
