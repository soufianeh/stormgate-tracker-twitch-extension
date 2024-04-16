import { HTTPException } from "hono/http-exception";
import { PlayerStats, PlayerMatches } from "../types";

export async function getPlayerData(
  playerId: string
): Promise<PlayerStats | null> {
  try {
    const response = await fetch(
      `https://api.stormgateworld.com/v0/players/${playerId}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new HTTPException(404, {
          message: "StormgateAPI: Player not found",
        });
      }
      throw new HTTPException(500, {
        message: "Stormgate API /players/ error",
      });
    }

    const data = await response.json();
    data.leaderboard_entries.forEach((entry: any) => {
      entry["id"] = entry["leaderboard_entry_id"];
      delete entry["leaderboard_entry_id"];
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getPlayerMatches(
  playerId: string
): Promise<PlayerMatches | null> {
  try {
    const response = await fetch(
      `https://api.stormgateworld.com/v0/players/${playerId}/matches`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new HTTPException(404, {
          message: "StormgateAPI: Matches not found",
        });
      }
      throw new HTTPException(500, { message: "Stormgate API error" });
    }

    const data = await response.json();
    data["matches"] = data["matches"].slice(0, 12);
    return data["matches"];
  } catch (error) {
    console.log(error);
    return null;
  }
}
