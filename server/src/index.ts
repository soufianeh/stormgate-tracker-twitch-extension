import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getPlayerData, getPlayerMatches } from "./services";
import { HTTPException } from "hono/http-exception";
import db from "./db";

const app = new Hono();
app.use("/api/*", cors());

app.post("/api/config", async (c) => {
  const body = await c.req.json();
  const { playerId, channelId } = body;
  try {
    const playerData = await getPlayerData(playerId);
    if (!playerData)
      throw new HTTPException(404, { message: "Player not found" });

    const playerMatches = await getPlayerMatches(playerId);
    if (!playerMatches)
      throw new HTTPException(404, { message: "Matches not found" });

    const existingPlayer = await db.getPlayerDataByPlayerId(playerId);
    if (existingPlayer) {
      return c.json({
        status: "ok",
        playerData,
        playerMatches,
      });
    }

    const createdPlayer = await db.createPlayer({
      channelId,
      playerId,
      playerData: JSON.stringify(playerData),
      matchesData: JSON.stringify(playerMatches),
    });

    if (!createdPlayer)
      throw new HTTPException(500, { message: "Error creating player" });

    return c.json({
      status: "ok",
      playerData,
      playerMatches: playerMatches,
    });
  } catch (error) {
    console.error(error);
    throw new HTTPException(500, {
      message: "Could not fetch player/matches data",
    });
  }
});

app.get("/api/players/:channelId", async (c) => {
  try {
    const { channelId } = c.req.param();
    const data: any = await db.getPlayerDataByChannelId(channelId);
    if (!data) return c.json({ playerData: null, matchesData: [] });
    return c.json({
      playerData: data.player_data,
      matchesData: data.matches_data,
    });
  } catch (error) {
    console.error(error);
    return c.json({
      playerData: null,
      matchesData: [],
    });
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
