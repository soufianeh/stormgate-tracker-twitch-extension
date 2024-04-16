import { useEffect, useState } from "react";
import { PlayerStats } from "../types";

function Config() {
  const [channelId, setChannelId] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerStats | null>(null);

  const configIdInUrlImg = new URL(`../assets/id_in_url.png`, import.meta.url)
    .href;

  useEffect(() => {
    (window as any).Twitch.ext.onAuthorized((auth: any) => {
      setChannelId(auth.channelId);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      setPlayerData(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/config`, {
        method: "POST",
        body: JSON.stringify({ playerId, channelId }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setPlayerData(data.playerData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error?.message || "Something went wrong, try again later.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
      }}>
      <form onSubmit={handleSubmit}>
        <fieldset role="group">
          <input
            type="text"
            id="playerid"
            value={playerId}
            placeholder="Enter your StormgateWorld player ID"
            onChange={(e) => setPlayerId(e.target.value)}
          />
          <button
            type="submit"
            aria-busy={isLoading}
            disabled={isLoading || !playerId}>
            Submit
          </button>
        </fieldset>
      </form>
      {playerData && (
        <div
          style={{
            backgroundColor: "#33790F",
            color: "#ffffff",
            padding: "10px",
            margin: "0",
          }}>
          <div>
            Data retrieved successfully! <br />
            You should be able to see your game data in the panel.
          </div>
          Username: <strong>{playerData.nickname}</strong>
        </div>
      )}
      {error && (
        <p
          style={{
            backgroundColor: "#9B2318",
            color: "#ffffff",
            padding: "10px",
          }}>
          {error}
        </p>
      )}
      To find your StormgateWorld Player ID:
      <ol>
        <li>
          Go to{" "}
          <a
            href="https://stormgateworld.com/leaderboards/ranked_1v1"
            target="_blank">
            stormgateworld.com
          </a>
          .
        </li>
        <li>Search for your stormgate username.</li>
        <li>Click on your username.</li>
        <li>
          The URL should look like this: https://stormgateworld.com/players/
          <strong>PLAYER_ID</strong>-<strong>USERNAME</strong>
          <img src={configIdInUrlImg} alt="profile url" />
        </li>
      </ol>
    </div>
  );
}

export default Config;
