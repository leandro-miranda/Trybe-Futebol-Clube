interface IMatcheCreate {
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface IMatcheBoard {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string;
  };
  teamAway?: {
    teamName: string;
  };
}

export { IMatcheCreate, IMatcheBoard };
