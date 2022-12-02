import ITime from '../interfaces/ITime';
import { IMatcheBoard } from '../interfaces/Matche';
import { ITeam } from '../interfaces/ITeam';
import {
  totalEmpates,
  golHome,
  golAway,
  totalDerrotasHome,
  totalVitoriasHome,
  classificacaoSort,
} from './leaderboardUtilsHome';

const totalPoints = (partidasTime: IMatcheBoard[]) => {
  const points = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals < game.awayTeamGoals) return acc + 3;
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;

    return acc;
  }, 0);

  return points;
};

const efficiency = (partidasTime: IMatcheBoard[]) => {
  const points = totalPoints(partidasTime);
  const partidas = partidasTime.length;
  const eficiencia = ((points / (partidas * 3)) * 100).toFixed(2);

  return { eficiencia, partidas, points };
};

const resultadoTime = (time: ITeam, partidasTime: IMatcheBoard[]) => {
  const { eficiencia, partidas, points } = efficiency(partidasTime);
  const result: ITime = {
    name: time.teamName,
    totalPoints: points,
    totalGames: partidas,
    totalVictories: totalDerrotasHome(partidasTime),
    totalDraws: totalEmpates(partidasTime),
    totalLosses: totalVitoriasHome(partidasTime),
    goalsFavor: golAway(partidasTime),
    goalsOwn: golHome(partidasTime),
    goalsBalance: golAway(partidasTime) - golHome(partidasTime),
    efficiency: eficiencia,
  };

  return result;
};

const leaderboardUtilsAway = async (
  matchesFinish: IMatcheBoard[],
  allTeams: ITeam[],
) => {
  const classificacao: ITime[] = await allTeams.map((time) => {
    const partidasTime: IMatcheBoard[] = matchesFinish.filter(
      (iten) => iten.awayTeam === time.id,
    );

    return resultadoTime(time, partidasTime);
  });

  return classificacaoSort(classificacao);
};

export default leaderboardUtilsAway;
