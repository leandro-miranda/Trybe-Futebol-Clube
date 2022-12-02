import { ITeam } from '../interfaces/ITeam';
import TeamsModel from '../database/models/team.model';

class TeamsService {
  public model = TeamsModel;

  public getAll = async ():Promise<ITeam[]> => {
    const result = await this.model.findAll();

    return result;
  };

  public getByPk = async (id: string):Promise<ITeam> => {
    const result = await this.model.findByPk(id);

    return result as ITeam;
  };
}

export default TeamsService;
