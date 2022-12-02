import ITime from '../interfaces/ITime';
import { classificacaoSort } from './leaderboardUtilsHome';

const efficiency = (timeDentro: ITime, timeFora: ITime) => {
  const points = timeDentro.totalPoints + timeFora.totalPoints;
  const partidas = timeDentro.totalGames + timeFora.totalGames;
  const eficiencia = ((points / (partidas * 3)) * 100).toFixed(2);

  return { eficiencia, partidas, points };
};

const golsBalance = (timeDentro: ITime, timeFora: ITime) => {
  const golsFeitos = timeDentro.goalsFavor + timeFora.goalsFavor;
  const golsContra = timeDentro.goalsOwn + timeFora.goalsOwn;
  const saldoGols = golsFeitos - golsContra;

  return { golsFeitos, saldoGols, golsContra };
};

const jogosDisputados = (timeDentro: ITime, timeFora: ITime) => {
  const vitorias = timeDentro.totalVictories + timeFora.totalVictories;
  const derrotas = timeDentro.totalLosses + timeFora.totalLosses;
  const empates = timeDentro.totalDraws + timeFora.totalDraws;

  return { vitorias, derrotas, empates };
};

const resultadoTime = (timeDentro: ITime, timeFora: ITime) => {
  const { points, partidas, eficiencia } = efficiency(timeDentro as ITime, timeFora as ITime);
  const { golsFeitos, saldoGols, golsContra } = golsBalance(timeDentro as ITime, timeFora as ITime);
  const { vitorias, derrotas, empates } = jogosDisputados(timeDentro as ITime, timeFora as ITime);
  const result: ITime = {
    name: timeDentro.name,
    totalPoints: points,
    totalGames: partidas,
    totalVictories: vitorias,
    totalDraws: empates,
    totalLosses: derrotas,
    goalsFavor: golsFeitos,
    goalsOwn: golsContra,
    goalsBalance: saldoGols,
    efficiency: eficiencia,
  };

  return result;
};

const leaderboard = async (gamesHome: ITime[], gamesAway: ITime[]) => {
  const resultado: ITime[] = await gamesHome.map((timeDentro) => {
    const [timeFora] = gamesAway.filter(
      (TimeAway) => timeDentro.name === TimeAway.name,
    );

    return resultadoTime(timeDentro as ITime, timeFora as unknown as ITime);
  });

  return classificacaoSort(resultado);
};

export default leaderboard;
