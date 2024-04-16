import "./PlayerSummary.scss";

import { PlayerStats } from "../types";

function PlayerSummary({ playerData }: { playerData: PlayerStats }) {
  const getTopEntry = (playerData: PlayerStats) => {
    const entries = playerData.leaderboard_entries;
    if (entries.length === 0) return null;
    if (entries.length === 1) return entries[0];
    return entries.reduce((prev, current) =>
      !current.rank || prev.rank < current.rank ? prev : current
    );
  };

  const topEntry = getTopEntry(playerData);
  if (!topEntry) return <div>No data</div>;
  const league =
    topEntry.league && topEntry.tier
      ? `${topEntry.league}${topEntry.tier}`
      : undefined;
  const leagueEmblemUrl = new URL(
    `../assets/leagues/${league}.webp`,
    import.meta.url
  ).href;
  const raceEmblemUrl = new URL(
    `../assets/emblems/${topEntry.race}.png`,
    import.meta.url
  ).href;

  return (
    <div className="summary">
      <div className="stats">
        <div>
          {topEntry.race && (
            <img
              src={leagueEmblemUrl}
              width="50"
              height="50"
              title={league}
              alt={league}
            />
          )}
          <div>
            <div className="nickname">
              {playerData?.nickname} # {topEntry.rank}
            </div>
            <div className="wl">
              <span className="w">{topEntry?.wins}</span> -{" "}
              <span className="l">{topEntry?.losses}</span>{" "}
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src={raceEmblemUrl}
          width="50"
          height="50"
          title={topEntry.race}
          alt={topEntry.race}
        />
      </div>
    </div>
  );
}

export default PlayerSummary;
