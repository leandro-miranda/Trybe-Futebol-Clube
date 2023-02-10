import ITime from '../interfaces/ITime';
import { IMatcheBoard } from '../interfaces/Matche';
import { ITeam } from '../interfaces/ITeam';

// A função totalPoints recebe um array de objetos do tipo IMatcheBoard como parâmetro e retorna um número
// que representa a pontuação de um time de acordo com os resultados das partidas.
// A pontuação é dada da seguinte forma: 3 pontos para vitória, 1 ponto para empate e 0 pontos para derrota.
const totalPoints = (partidasTime: IMatcheBoard[]) => {
  const points = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 3;
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return points;
};

// A função totalVitoriasHome() recebe um array de objetos do tipo IMatcheBoard e retorna o número de vitórias do time que está em casa.
// Para isso, ela usa o método reduce() para percorrer o array de partidas e, para cada partida,
// verifica se o time da casa marcou mais gols do que o time visitante. Se sim, incrementa o acumulador com 1, senão, retorna o mesmo valor.
export const totalVitoriasHome = (partidasTime: IMatcheBoard[]) => {
  const vitorias = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return vitorias;
};

// Essa função recebe uma lista de partidas de um time e conta quantos empates esse time teve.
// O resultado é um número inteiro que representa a quantidade de empates.
export const totalEmpates = (partidasTime: IMatcheBoard[]) => {
  const empates = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return empates;
};

// A função totalDerrotasHome() tem como objetivo contar o número de derrotas de um time em casa.
// Ela recebe como parâmetro um array de partidas do time e utiliza o método reduce() para percorrer cada partida
// e verificar se o time perdeu a partida (através da comparação dos gols marcados pelo time como visitante e como mandante).
// Se o time tiver marcado menos gols do que o adversário, o contador de derrotas é incrementado em 1. Ao final da execução da função,
// o valor do contador de derrotas é retornado.
export const totalDerrotasHome = (partidasTime: IMatcheBoard[]) => {
  const derrotas = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals < game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return derrotas;
};

// A função golHome recebe um array de partidas do time como parâmetro e retorna o total de gols marcados
// pelo time em casa em todas as partidas. Ela faz isso somando os gols do time em casa de cada partida,
// usando o método reduce para criar um acumulador.
export const golHome = (partidasTime: IMatcheBoard[]) => {
  const gols = partidasTime.reduce((acc, game) => acc + game.homeTeamGoals, 0);
  return gols;
};

// Essa função retorna a soma dos gols da equipe mandante de uma lista de partidas.
// Ela recebe como parâmetro uma lista de partidas (partidasTime) e usa o método reduce para somar os gols de todas as partidas,
// começando com um acumulador inicial de 0.
export const golAway = (partidasTime: IMatcheBoard[]) => {
  const gols = partidasTime.reduce((acc, game) => acc + game.awayTeamGoals, 0);
  return gols;
};

// A função efficiency recebe um vetor de partidas(matches) como parâmetro.
// A partir disso, ela calcula a eficiência do time, que é a porcentagem de pontos obtidos em relação ao total de pontos possíveis.
// Havendo 3 pontos por partida, a eficiência é calculada como (pontos obtidos/ (partidas * 3)) * 100.
// A função retorna três valores: a eficiência, o número de partidas e o total de pontos obtidos.
const efficiency = (partidasTime: IMatcheBoard[]) => {
  const points = totalPoints(partidasTime);
  const partidas = partidasTime.length;
  const eficiencia = ((points / (partidas * 3)) * 100).toFixed(2);
  return { eficiencia, partidas, points };
};

// Esta função está classificando uma lista de times (classificacao) de acordo com os seguintes parâmetros:
// totalPoints, totalVictories, goalsBalance, goalsFavor e goalsOwn.
// Ela usa o método sort para organizar a lista de acordo com a ordem de preferência de cada um dos parâmetros.
export const classificacaoSort = (classificacao: ITime[]) => {
  const sort = classificacao.sort(
    (a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn,
  );
  return sort;
};

// A função resultadoTime recebe dois parâmetros: time e partidasTime. O primeiro parâmetro é do tipo ITeam,
// que é uma interface que contém informações básicas de um time de futebol, como nome do time, entre outros.
// O segundo parâmetro é do tipo IMatcheBoard, que é uma interface que contém os resultados de uma partida de futebol.
// A função calcula os resultados de um time de futebol a partir dos resultados de suas partidas.
// Ela usa a função efficiency para calcular a eficiência do time ao longo das partidas.
// Ela também usa as funções totalVitoriasHome, totalEmpates, totalDerrotasHome, golHome e golAway para calcular os resultados do time.
// Por fim, a função retorna um objeto do tipo ITime, que contém todas as informações calculadas acima sobre o time.
const resultadoTime = (time: ITeam, partidasTime: IMatcheBoard[]) => {
  const { eficiencia, partidas, points } = efficiency(partidasTime);
  const result: ITime = {
    name: time.teamName,
    totalPoints: points,
    totalGames: partidas,
    totalVictories: totalVitoriasHome(partidasTime),
    totalDraws: totalEmpates(partidasTime),
    totalLosses: totalDerrotasHome(partidasTime),
    goalsFavor: golHome(partidasTime),
    goalsOwn: golAway(partidasTime),
    goalsBalance: golHome(partidasTime) - golAway(partidasTime),
    efficiency: eficiencia,
  };
  return result;
};

// Esta função é uma função auxiliar que ajuda na formação da tabela de classificação de um time de futebol.
// Ela recebe como parâmetros um vetor de partidas concluídas e um vetor com todos os times,
// e retorna a classificação dos times de acordo com os dados informados.
const LeaderboardUtilsHome = async (
  matchesFinish: IMatcheBoard[],
  allTeams: ITeam[],
) => {
  const classificacao: ITime[] = await allTeams.map((time) => {
    const partidasTime: IMatcheBoard[] = matchesFinish.filter(
      (iten) => iten.homeTeam === time.id,
    );

    return resultadoTime(time, partidasTime);
  });

  return classificacaoSort(classificacao);
};

export default LeaderboardUtilsHome;
