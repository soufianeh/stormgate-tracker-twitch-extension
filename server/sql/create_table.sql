CREATE TABLE "players" (
	"id"	INTEGER,
	"channel_id"	TEXT UNIQUE,
	"player_id"	TEXT UNIQUE,
	"player_data"	BLOB,
	"matches_data"	BLOB,
	"created_at"	TEXT DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TRIGGER update_updated_at
AFTER UPDATE ON players
FOR EACH ROW
BEGIN
    UPDATE players
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;

CREATE UNIQUE INDEX "channel_id_index" ON "players" (
	"channel_id"
);

CREATE UNIQUE INDEX "player_id_index" ON "players" (
	"player_id"
);