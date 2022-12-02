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

  public saveMatcheInProgress = async (body: IMatcheCreate) => {
    const newMatche = await matches.create({ ...body, inProgress: true });
    return newMatche;
  };

  public changeInprogressMatche = async (id: string, inProgress: boolean) => {
    const result = await matches.update({ inProgress }, { where: { id } });
    return result;
  };

  public changeMatche = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    const result = await matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return result;
  };
}

export default MatchesService;
