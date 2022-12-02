import { Request, Response } from 'express';
import ITime from '../interfaces/ITime';
import LeaderboardService from '../services/LeaderboardService';
import { IMatcheBoard } from '../interfaces/Matche';
import { ITeam } from '../interfaces/ITeam';
import LeaderboardUtilsHome from '../utils/leaderboardUtilsHome';
import leaderboardUtilsAway from '../utils/leaderboardUtilsAway';
import leaderboard from '../utils/leaderboard';

class LeaderboardController {
  public service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public leaderboardHome = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboardFalse();
    const result = await LeaderboardUtilsHome(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);

    return res.status(200).json(result);
  };

  public leaderboardAway = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboardFalse();
    const result = await leaderboardUtilsAway(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);

    return res.status(200).json(result);
  };

  public leaderboard = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboardFalse();

    const gamesAway = await
    leaderboardUtilsAway(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);

    const gamesHome = await
    LeaderboardUtilsHome(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);

    const result = await
    leaderboard(gamesHome as ITime[], gamesAway as ITime[]);

    return res.status(200).json(result);
  };
}

export default LeaderboardController;
