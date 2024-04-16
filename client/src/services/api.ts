export async function getPlayerData(channelId: string): Promise<any> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/players/${channelId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    data["playerData"] = JSON.parse(data.playerData);
    data["matchesData"] = JSON.parse(data.matchesData);

    return data;
  } catch (error) {
    throw new Error("Could not fetch player data.");
  }
}
