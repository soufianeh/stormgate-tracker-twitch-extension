import "./PlayerBadge.scss";

import { Player } from "../types";
import vanguardEmblem from "../assets/emblems/vanguard.png";
import infernalsEmblem from "../assets/emblems/infernals.png";
function PlayerBadge({ player }: Props) {
  const emblem = player.race === "vanguard" ? vanguardEmblem : infernalsEmblem;
  return (
    <div className="player-badge">
      <img
        src={emblem}
        width={20}
        height={20}
        alt={player.race}
        title={player.race}
      />
      <span title={player.nickname}>{player.nickname}</span>
    </div>
  );
}

type Props = {
  player: Player;
};

export default PlayerBadge;
