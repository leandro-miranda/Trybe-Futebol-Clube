import ITime from '../interfaces/ITime';
import { classificacaoSort } from './leaderboardUtilsHome';

// Essa função calcula a eficiência de dois times de futebol, somando seus pontos e partidas jogadas.
// Ela recebe como parâmetros dois objetos que contêm os dados dos times (totalPoints e totalGames) e retorna um objeto contendo a eficiência,
// o número de partidas e o total de pontos.
const efficiency = (timeDentro: ITime, timeFora: ITime) => {
  const points = timeDentro.totalPoints + timeFora.totalPoints;
  const partidas = timeDentro.totalGames + timeFora.totalGames;
  const eficiencia = ((points / (partidas * 3)) * 100).toFixed(2);

  return { eficiencia, partidas, points };
};

// Esta função recebe dois objetos do tipo ITime como parâmetros e calcula o saldo de gols, gols feitos e gols sofridos.
// Ela retorna um objeto contendo essas três informações.
const golsBalance = (timeDentro: ITime, timeFora: ITime) => {
  const golsFeitos = timeDentro.goalsFavor + timeFora.goalsFavor;
  const golsContra = timeDentro.goalsOwn + timeFora.goalsOwn;
  const saldoGols = golsFeitos - golsContra;

  return { golsFeitos, saldoGols, golsContra };
};

// A função jogosDisputados() recebe dois parâmetros (timeDentro e timeFora), que são objetos do tipo ITime.
// Essa função soma os valores de totalVictories, totalLosses e totalDraws dos dois objetos, e retorna um novo objeto contendo os somatórios desses valores.
const jogosDisputados = (timeDentro: ITime, timeFora: ITime) => {
  const vitorias = timeDentro.totalVictories + timeFora.totalVictories;
  const derrotas = timeDentro.totalLosses + timeFora.totalLosses;
  const empates = timeDentro.totalDraws + timeFora.totalDraws;

  return { vitorias, derrotas, empates };
};

// Esta função tem o objetivo de calcular o resultado de um time de futebol a partir dos dados de outro time. Ela recebe dois parâmetros: timeDentro e timeFora.
// Estes parâmetros são objetos do tipo ITime, que possuem informações sobre o time em questão, tais como o nome, o número de pontos, jogos, vitórias, empates,
// derrotas, gols a favor, gols contra e saldo de gols. A função então usa esses dados para calcular a eficiência do time, o saldo de gols,
// os jogos disputados e o número de pontos. Estes dados são usados para preencher um objeto do tipo ITime, que é então retornado como resultado.
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

// Essa função recebe dois arrays contendo os jogos de casa e fora de um time em específico. Ela então faz um loop nos jogos de casa,
// e filtra os jogos fora que são daquele time. Em seguida, ela executa a função de resultadoTime, passando os dados de casa e fora.
// Por fim, a função classificacaoSort é executada para classificar os resultados. A função leaderboard retorna o resultado da classificação.
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
