import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  constructor(protected teamsService = new TeamsService()) { }

  // Essa função é responsável por buscar todos os elementos cadastrados na tabela de times de um serviço (this.teamsService).
  // Ao final, o resultado é enviado como uma resposta HTTP no formato JSON, com o status 200 (OK).
  public getAll = async (req: Request, res: Response) => {
    const result = await this.teamsService.getAll();

    return res.status(200).json(result);
  };

  // Esse código é uma função que faz parte de um servidor web. Ela é responsável por pegar um registro específico de algum serviço e retornar ao usuário na forma de um JSON.
  // A função aceita uma solicitação (req) e uma resposta (res) como parâmetros, e recebe um ID a partir da solicitação, então ela usa esse ID para chamar outro serviço,
  // que busca o registro específico e retorna o resultado. Depois, a função retorna o resultado à solicitação com um status HTTP 200 e o formato JSON.
  public getByPk = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamsService.getByPk(id);

    return res.status(200).json(result);
  };
}

export default TeamsController;
