import "./MatchRow.scss";

import { Match } from "../types";
import PlayerBadge from "./PlayerBadge";
//@ts-expect-error: weird icon type error
import MMRUP from "~icons/tabler/caret-up-filled";
//@ts-expect-error: weird icon type error
import MMRDOWN from "~icons/tabler/caret-down-filled";

function MatchRow({ key, match }: Props) {
  let result = "-";
  let mmrIcon = <></>;
  if (match.result === "win") {
    result = "w";
    mmrIcon = <MMRUP />;
  } else if (match.result == "loss") {
    result = "l";
    mmrIcon = <MMRDOWN />;
  } else {
    result = "-";
  }
  const mmrChange = Math.round(match.me.mmr_change);

  return (
    <tr
      key={key}
      className={`match-row result-${result === "-" ? "no" : result}`}>
      <td className={`result`}>
        <div>{result}</div>
      </td>

      <td className="player">
        <PlayerBadge player={match.opp} />
      </td>
      <td className="mmr-change">
        <div className="mmr">
          {mmrIcon} <span>{Math.abs(mmrChange)}</span>
        </div>
      </td>
    </tr>
  );
}

type Props = {
  match: Match;
} & { key: string };

export default MatchRow;
