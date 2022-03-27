import "./Gamepage.scss";
import { v4 as uuid } from "uuid";
import { useEffect, useState, useRef } from "react";
import useTimer from "../../hooks/Timer";
import formatTime from "../../utils/formatTime";
import { getBrokenBottts } from "../../utils/botCreation";
import LevelOne from "../../components/LevelOne/LevelOne";

const Gamepage = ({ userName, levelsData }) => {
  const { timer, startTimer, pauseTimer, resetTimer } = useTimer(0);
  const [placeholderBottts, setPlaceholderBottts] = useState({});
  const [target, setTarget] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");

  useEffect(() => {
    console.log(levelsData);
    setTarget(levelsData.levelOne.targetBottt);
    startTimer();
    setPlaceholderBottts(getBrokenBottts());
  }, []);

  useEffect(() => {
    if (selectedChoice === target) {
      console.log("Match");
    }
  }, [selectedChoice]);

  if (!placeholderBottts.botttOne) return <div>Loading...</div>;

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
        <div className="game-page__screen">
          <LevelOne
            setSelectedChoice={setSelectedChoice}
            levelData={levelsData.levelOne.allBottts}
          />
        </div>
        <div className="dash">
          <h2 className="dash__header">Target Robot</h2>
          <img
            className="dash__target-robot"
            src={levelsData.levelOne.targetBottt}
            alt="target robot"
          />
          <h2 className="dash__header">Selected Robot</h2>
          <img
            className="dash__target-robot"
            src={selectedChoice || placeholderBottts.botttOne}
            alt="target robot"
          />
          <h2 className="dash__header">BB Chat</h2>
          <div className="dash__chat-box">
            <p className="dash__chat-text">Testing dasdkasd ada dasda sd as</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gamepage;
