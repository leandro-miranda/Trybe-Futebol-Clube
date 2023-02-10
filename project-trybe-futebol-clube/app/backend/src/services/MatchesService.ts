import teams from '../database/models/team.model';
import matches from '../database/models/match.model';
import { IMatcheCreate } from '../interfaces/Matche';

class MatchesService {
  public matchesGetAll = async () => {
    const allMatches = await matches.findAll({
      include: [
        {
          model: teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return allMatches;
  };

  // Esta função cria um novo jogo (matche) e adiciona o atributo "inProgress" com o valor booleano "true" ao jogo criado.
  public saveMatcheInProgress = async (body: IMatcheCreate) => {
    const newMatche = await matches.create({ ...body, inProgress: true });
    return newMatche;
  };

  // Esta função altera o estado dos jogos em andamento. Ela recebe o ID do jogo e um booleano que indica se o jogo está em andamento ou não.
  // Ela atualiza o registro no banco de dados e retorna o resultado.
  public changeInprogressMatche = async (id: string, inProgress: boolean) => {
    const result = await matches.update({ inProgress }, { where: { id } });
    return result;
  };

  // Esta função atualiza os resultados de um jogo, especificado pelo ID, com os novos valores de gols dados para cada equipe.
  public changeMatche = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    const result = await matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return result;
  };
}

export default MatchesService;
