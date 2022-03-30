import "./HighscoreTable.scss";
import { v4 as uuid } from "uuid";
import formatTime from "../../utils/formatTime";

const HighscoreTable = ({ list }) => {
  return (
    <div className="highscore-screen__table">
      <ul className="highscore-screen__table-items highscore-screen__table-items--header">
        <li className="highscore-screen__table-item">User</li>
        <li className="highscore-screen__table-item">Time</li>
        <li className="highscore-screen__table-item highscore-screen__table-item--seed">
          Seed
        </li>
        <li className="highscore-screen__table-item">Randomized?</li>
      </ul>
      {list.map((highscore) => {
        return (
          <ul key={uuid()} className="highscore-screen__table-items">
            <li className="highscore-screen__table-item">{highscore.name}</li>
            <li className="highscore-screen__table-item">
              {formatTime(highscore.time)}
            </li>
            <li className="highscore-screen__table-item highscore-screen__table-item--seed">
              {highscore.seed}
            </li>
            <li
              className={`highscore-screen__table-item ${
                highscore.newSeed && "highscore-screen__table-item--colour"
              }`}
            >
              {highscore.newSeed ? "YES" : "NO"}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default HighscoreTable;
