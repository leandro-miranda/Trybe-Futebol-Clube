import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import TeamService from '../services/TeamsService';

// Esse código cria duas variáveis públicas, "service" e "teamService",
// e no construtor da classe é criado o objeto das duas variáveis como instâncias das classes MatchesService e TeamService.
class MatchesController {
  public service: MatchesService;
  public teamService: TeamService;

  constructor() {
    this.service = new MatchesService();
    this.teamService = new TeamService();
  }

  // Esse código é um método para obter todos os jogos (matches) de um serviço.
  // Ele aceita um parâmetro opcional na requisição (inProgress) para filtrar os jogos ativos ou não. Se o parâmetro não for passado, todos os jogos serão retornados.
  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const matches = await this.service.matchesGetAll();

    if (inProgress === 'true') {
      const result = matches.filter((jogo) => jogo.inProgress === true);

      return res.status(200).json(result);
    }

    if (inProgress === 'false') {
      const result = matches.filter((jogo) => jogo.inProgress === false);

      return res.status(200).json(result);
    }

    return res.status(200).json(matches);
  };

  // Esse código faz uma função usando o padrão async/await para salvar um jogo em progresso. Primeiro ele obtém os times por meio de suas chaves primárias.
  // Se não houver nenhum time, ele retornará uma mensagem de erro. Depois, cria um novo jogo com os dados fornecidos e o inProgress definido como true.
  // Por fim, retorna o novo jogo com um status de 201.
  public matcheSaveInProgress = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam } = req.body;
    const teamHome = await this.teamService.getByPk(homeTeam);
    const teamAway = await this.teamService.getByPk(awayTeam);

    if (!teamHome || !teamAway) {
      return res
        .status(404)
        .json({ message: 'There is no team with such id!' });
    }

    const newMatche = await this.service.saveMatcheInProgress({
      ...req.body,
      inProgress: true,
    });

    return res.status(201).json(newMatche);
  };

  // Essa função é responsável por alterar o status de um jogo em andamento. O parâmetro "id" é passado na solicitação e o status "inProgress" é definido como false.
  // Então, o serviço é chamado para alterar o jogo para não em andamento e uma mensagem de sucesso é retornada.
  public changeMatcheInprogrees = async (req: Request, res: Response) => {
    const { id } = req.params;
    const inProgress = false;
    await this.service.changeInprogressMatche(id, inProgress);
    return res.status(200).json({ message: 'Finished' });
  };

  // Esse código representa uma função que altera os resultados de uma partida. Ela recebe um ID,
  // os resultados da equipe da casa e os resultados da equipe visitante como parâmetros e usa esses dados para atualizar os resultados da partida.
  // A função também retorna uma mensagem de sucesso quando a alteração é bem-sucedida.
  public changeMatche = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.service.changeMatche(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'match changed successfully' });
  };
}

export default MatchesController;
