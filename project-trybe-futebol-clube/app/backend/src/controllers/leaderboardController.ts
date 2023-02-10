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

  // recupera os matchesFinish e allTeams de um serviço e os passa para a função LeaderboardUtilsHome para serem tratados.
  // Depois, a função retorna um status 200 e um json com o resultado para a requisição.
  public leaderboardHome = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboardFalse();
    const result = await LeaderboardUtilsHome(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);

    return res.status(200).json(result);
  };

  // Esse código é uma função assíncrona que, quando chamada, busca os resultados de competições e times em um banco de dados e os usa para criar um leaderboard.
  // Em seguida, a função retorna o leaderboard em formato JSON para o usuário.
  public leaderboardAway = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboardFalse();
    const result = await leaderboardUtilsAway(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);

    return res.status(200).json(result);
  };

  // Trata-se de uma função que cria um líder de equipe "leaderboard". Ela usa outras funções para obter os jogos em casa e os jogos fora de casa.
  // Estas informações são então usadas para criar o líder da equipe, que é retornado na resposta.
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
