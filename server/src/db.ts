import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_path = path.join(__dirname, "..", "..", "data.db");
console.log(db_path);
const db = new sqlite3.Database(db_path);
sqlite3.verbose();
function createPlayer({ channelId, playerId, playerData, matchesData }: any) {
  return new Promise(async (resolve, reject) => {
    const existingPlayer = await getPlayerDataByPlayerId(playerId);
    if (existingPlayer) {
      resolve(existingPlayer);
    }
    const query = `INSERT INTO players (channel_id, player_id, player_data, matches_data) VALUES ($channelId, $playerId, json($playerData), json($matchesData))`;
    db.run(
      query,
      {
        $channelId: channelId,
        $playerId: playerId,
        $playerData: playerData,
        $matchesData: matchesData,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          const newPlayer = getPlayerDataByPlayerId(playerId);
          resolve(newPlayer);
        }
      }
    );
  });
}

function updatePlayer({ playerId, playerData, matchesData }: any) {
  return new Promise(async (resolve, reject) => {
    const existingPlayer = await getPlayerDataByPlayerId(playerId);
    if (existingPlayer) {
      resolve(existingPlayer);
    }
    const query = `UPDATE players SET player_data = json($playerData), matches_data = json($matchesData) WHERE player_id = $playerId`;
    db.run(
      query,
      {
        $playerId: playerId,
        $playerData: playerData,
        $matchesData: matchesData,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          const newPlayer = getPlayerDataByPlayerId(playerId);
          resolve(newPlayer);
        }
      }
    );
  });
}

function getAllPlayers() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM players`;
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getPlayerDataByPlayerId(playerId: string) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM players WHERE player_id = $playerId`;
    db.get(query, { $playerId: playerId }, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function getPlayerDataByChannelId(channelId: string) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM players WHERE channel_id = $channelId`;
    db.get(query, { $channelId: channelId }, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export default {
  getPlayerDataByPlayerId,
  getPlayerDataByChannelId,
  createPlayer,
  updatePlayer,
  getAllPlayers,
};
