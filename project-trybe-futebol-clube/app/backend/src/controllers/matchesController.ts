import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import TeamService from '../services/TeamsService';

class MatchesController {
  public service: MatchesService;
  public teamService: TeamService;

  constructor() {
    this.service = new MatchesService();
    this.teamService = new TeamService();
  }

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

  public changeMatcheInprogrees = async (req: Request, res: Response) => {
    const { id } = req.params;
    const inProgress = false;
    await this.service.changeInprogressMatche(id, inProgress);
    return res.status(200).json({ message: 'Finished' });
  };

  public changeMatche = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.service.changeMatche(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'match changed successfully' });
  };
}

export default MatchesController;
