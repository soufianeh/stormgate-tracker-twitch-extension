export function parseMatchData(playerData: any, match: any) {
  let me = match.players.filter((p: any) => {
    return p?.player?.player_id === playerData?.id;
  });
  let opp = match.players.filter((p: any) => {
    return p?.player?.player_id !== playerData?.id;
  });

  opp = opp[0];
  me = me[0];

  if (!opp || !opp.player || !me || !me.player) return null;

  const meData = parsePlayerData(me);
  const oppData = parsePlayerData(opp);
  const matchData = {
    id: match?.match_id,
    mode: match?.leaderboard,
    result: me.result,
    me: meData,
    opp: oppData,
  };

  return matchData;
}

export function parseMatchesData(playerData: any, matchesData: any) {
  return matchesData.map((match: any) => {
    return parseMatchData(playerData, match);
  });
}

export function parsePlayerData(player: any) {
  return {
    id: player?.player.player_id,
    nickname: player.player.nickname,
    race: player.race,
    league: player.player_leaderboard_entry.league,
    tier: player.player_leaderboard_entry.tier,
    mmr_change: player.mmr_diff,
  };
}
