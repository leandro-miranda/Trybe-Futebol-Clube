import TeamService from './TeamsService';
import MatchesService from './MatchesService';

class LeaderboardService {
  public service: MatchesService;
  public serviceTeam: TeamService;

  constructor() {
    this.service = new MatchesService();
    this.serviceTeam = new TeamService();
  }

  // A função homeTeamLeaderboardFalse() realiza a busca de todos os jogos que não estão em andamento no banco de dados, bem como todos os times cadastrados.
  // Ela retorna um objeto contendo as informações dos jogos finalizados e dos times cadastrados.
  public homeTeamLeaderboardFalse = async () => {
    const allMatches = await this.service.matchesGetAll();
    const allTeams = await this.serviceTeam.getAll();
    const matchesFinish = allMatches.filter((partida) => partida.inProgress === false);

    return { matchesFinish, allTeams };
  };
}

export default LeaderboardService;
