import db from "../db";
import { getPlayerData, getPlayerMatches } from "../services";

export async function updatePlayerData() {
  console.log("Updating player data...");
  const players: any = await db.getAllPlayers();
  for (const { player_id: playerId } of players) {
    const playerData = await getPlayerData(playerId);
    const matchesData = await getPlayerMatches(playerId);
    console.log({ playerData, matchesData });
    await db.updatePlayer({
      playerId,
      playerData: JSON.stringify(playerData),
      matchesData: JSON.stringify(matchesData),
    });
  }
}

updatePlayerData();

module.exports = updatePlayerData;
