export type PlayerStats = {
  id: string;
  nickname: string;
  leaderboard_entries: LeaderboardEntry[];
};

export type LeaderboardEntry = {
  id: string;
  rank: string;
  race: string;
  league: string;
  tier: number;
  win_rate: number;
  wins: number;
  losses: number;
  ties: number;
};

export type Player = {
  id: string;
  mmr_change: number;
  nickname: string;
  race: string;
  league: string;
  tier: string;
};

export type Match = {
  id: string;
  me: Player;
  opp: Player;
  result: "win" | "loss" | "draw";
};

export type PlayerMatches = [];
