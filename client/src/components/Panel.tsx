import "./Panel.scss";

import { useEffect, useState } from "react";
import { type Match, PlayerStats, PlayerMatches } from "../types";
import { getPlayerData } from "../services/api";
import { parseMatchesData } from "../utils";
import MatchRow from "./MatchRow";
import PlayerSummary from "./PlayerSummary";

function Panel() {
  const [playerData, setPlayerData] = useState<PlayerStats | null>(null);
  const [playerMatches, setPlayerMatches] = useState<PlayerMatches | null>(
    null
  );
  const [channelId, setChannelId] = useState("175624651");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (window as any).Twitch.ext.onAuthorized((auth: any) => {
      setChannelId(auth.channelId);
    });
  }, []);

  useEffect(() => {
    if (!channelId) return;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPlayerData(channelId);
        const playerData: PlayerStats = data.playerData;
        setPlayerData(playerData);

        let matches: PlayerMatches = data.matchesData;
        matches = parseMatchesData(playerData, matches);
        setPlayerMatches(matches);
      } catch (e) {
        if (e instanceof Error) {
          setError(e?.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [channelId]);

  if (error) return <div style={{ padding: "10px" }}>{error}</div>;
  return (
    <div id="panel">
      {isLoading ? (
        "Loading Data..."
      ) : (
        <>
          <div>{/* <pre>{JSON.stringify(playerMatches, null, 2)}</pre> */}</div>
          {playerData && <PlayerSummary playerData={playerData} />}
          {playerMatches && playerMatches.length > 0 && (
            <div className="matches">
              <table>
                <tbody>
                  {playerMatches?.map((match: Match) => (
                    <MatchRow match={match} key={match.id} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Panel;
