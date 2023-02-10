import { ITeam } from '../interfaces/ITeam';
import TeamsModel from '../database/models/team.model';

class TeamsService {
  public model = TeamsModel;

  // Esta função é uma função assíncrona que busca todos os dados de um modelo e os retorna como um array de tipo ITeam.
  public getAll = async ():Promise<ITeam[]> => {
    const result = await this.model.findAll();

    return result;
  };

  // Esta função é responsável por recuperar um time específico usando seu ID como parâmetro.
  // Ela usa a função findByPk do modelo especificado para recuperar o time requerido e retorna o resultado como um objeto ITeam.
  public getByPk = async (id: string):Promise<ITeam> => {
    const result = await this.model.findByPk(id);

    return result as ITeam;
  };
}

export default TeamsService;
