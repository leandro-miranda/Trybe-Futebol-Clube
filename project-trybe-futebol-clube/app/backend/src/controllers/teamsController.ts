import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  constructor(protected teamsService = new TeamsService()) { }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.teamsService.getAll();

    return res.status(200).json(result);
  };

  public getByPk = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamsService.getByPk(id);

    return res.status(200).json(result);
  };
}

export default TeamsController;
