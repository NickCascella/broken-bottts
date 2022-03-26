import "./Gamepage.scss";
import { v4 as uuid } from "uuid";
import { useEffect, useState, useRef } from "react";
import useTimer from "../../hooks/Timer";
import formatTime from "../../utils/formatTime";
import { getBrokenBottts } from "../../utils/botCreation";
import binaryGif from "../../../src/assets/images/binary.gif";

const Gamepage = ({ userName, levelsData }) => {
  const { timer, startTimer, pauseTimer, resetTimer } = useTimer(0);
  const [placeholderBottts, setPlaceholderBottts] = useState({});

  useEffect(() => {
    startTimer();
    setPlaceholderBottts(getBrokenBottts());
  }, []);

  return (
    <section className="game-page">
      <section className="game-page__header">
        <div className="display-one">
          <p className="display-one__name-seed display-one__name-seed--name">
            <span className="display-one__name-seed--title">NAME:</span>{" "}
            {userName || "Unknown Entity"}
          </p>
          <p className="display-one__name-seed">
            <span className="display-one__name-seed--title"> FACTORY:</span>{" "}
            35dc058c-364f-4064-90b5-d00f76300617
          </p>
        </div>
        <div className="display-two">
          <h1 className="display-two__name">Broken Bottts</h1>
          <div className="display-two__captured-bottts">
            <img
              className="display-two__captured-bottt display-two__captured-bottt--found"
              src={placeholderBottts.botttOne}
              alt="broken robot"
            />
            <img
              className="display-two__captured-bottt"
              src={placeholderBottts.botttTwo}
              alt="broken robot"
            />{" "}
            <img
              className="display-two__captured-bottt"
              src={placeholderBottts.botttThree}
              alt="broken robot"
            />{" "}
            <img
              className="display-two__captured-bottt"
              src={placeholderBottts.botttFour}
              alt="broken robot"
            />
          </div>
        </div>
        <div className="display-three">
          <p>{formatTime(timer)}</p>
        </div>
      </section>
      <div className="game-page__game-wrapper">
        <div className="game-page__screen">s</div>
        <div className="game-page__dash">d</div>
      </div>
    </section>
  );
};

export default Gamepage;
