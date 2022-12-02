import TeamService from './TeamsService';
import MatchesService from './MatchesService';

class LeaderboardService {
  public service: MatchesService;
  public serviceTeam: TeamService;

  constructor() {
    this.service = new MatchesService();
    this.serviceTeam = new TeamService();
  }

  public homeTeamLeaderboardFalse = async () => {
    const allMatches = await this.service.matchesGetAll();
    const allTeams = await this.serviceTeam.getAll();
    const matchesFinish = allMatches.filter((partida) => partida.inProgress === false);

    return { matchesFinish, allTeams };
  };
}

export default LeaderboardService;
