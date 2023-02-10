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

// Essa função recebe um array de objetos com a estrutura de partidas de um time e
// retorna a quantidade total de pontos que esse time obteve ao longo dessas partidas.
// Ela percorre o array de partidas e soma 3 pontos caso o time tenha vencido a partida, 1 ponto caso tenha empatado e 0 pontos caso tenha perdido.
const totalPoints = (partidasTime: IMatcheBoard[]) => {
  const points = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals < game.awayTeamGoals) return acc + 3;
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;

    return acc;
  }, 0);

  return points;
};

// A função efficiency calcula a eficiência de um time de futebol a partir de um array de partidas.
// Ela recebe um array de partidas e calcula a eficiencia usando a função totalPoints para obter os pontos somados
// e a divisão desse total pelo número de partidas vezes 3 (que é o número máximo de pontos que um time pode somar).
// Por último, a eficiência é arredondada para duas casas decimais. A função retorna um objeto contendo a eficiência, o número de partidas e o total de pontos.
const efficiency = (partidasTime: IMatcheBoard[]) => {
  const points = totalPoints(partidasTime);
  const partidas = partidasTime.length;
  const eficiencia = ((points / (partidas * 3)) * 100).toFixed(2);

  return { eficiencia, partidas, points };
};

// Esta função calcula o resultado de um time específico em uma série de partidas.
// Ela recebe como parâmetros o time (com nome e outras informações) e uma lista de partidas e calcula o número total de pontos,
// partidas, vitórias, empates, derrotas, gols marcados a favor, gols marcados contra e a eficiência do time. O resultado é devolvido como um objeto JSON.
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

// Essa função tem como objetivo calcular a classificação de times em uma competição.
// Para isso, ela recebe como parâmetro um array de partidas finalizadas e um array de todos os times participantes da competição.
// O primeiro passo é o mapeamento da array de times para criar uma array de resultados dos times.
// Em seguida, a função classificacaoSort é chamada e ela retorna a classificação dos times.
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
