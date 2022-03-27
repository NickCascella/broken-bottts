import "./Gamepage.scss";
import { v4 as uuid } from "uuid";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import useTimer from "../../hooks/Timer";
import formatTime from "../../utils/formatTime";
import { getBrokenBottts } from "../../utils/botCreation";
import LoadingBars from "../../components/LoadingBars/LoadingBars";
import LevelOne from "../../components/LevelOne/LevelOne";

const Gamepage = ({ userName, levelsData }) => {
  const { timer, startTimer, pauseTimer, resetTimer } = useTimer(0);
  const [placeholderBottts, setPlaceholderBottts] = useState({});
  const [target, setTarget] = useState("");
  const [wrongSelection, setWrongSelection] = useState(false);
  const [correctSelection, setCorrectSelection] = useState(false);
  const [disableClick, setDisableClick] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [levelsCompleted, setLevelsCompleted] = useState(0);
  const [levelTransition, setLevelTransition] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!levelsData) return history.push("/");
    setTarget(levelsData.levelOne.targetBottt);
    startTimer();
    setPlaceholderBottts(getBrokenBottts());
  }, []);

  useEffect(() => {
    if (!disableClick && (selectedChoice !== "" || target !== "")) {
      if (selectedChoice === target) {
        setWrongSelection(false);
        setCorrectSelection(true);
        setDisableClick(true);
        setTimeout(() => {
          setCorrectSelection(false);
          setDisableClick(false);
          setLevelsCompleted(levelsCompleted + 1);
          setPlaceholderBottts({
            ...placeholderBottts,
            botttOne: selectedChoice,
          });
          setLevelTransition(true);
          setTimeout(() => {
            if (levelsCompleted === 0) {
              console.log(levelsCompleted);

              setTarget(levelsData.levelTwo.targetBottt);
              setSelectedChoice(placeholderBottts.botttTwo);
            }
            setLevelTransition(false);
          }, 5500);
        }, 3000);
      } else {
        setWrongSelection(true);
        setDisableClick(true);
        setTimeout(() => {
          setWrongSelection(false);
          setDisableClick(false);
        }, 3000);
      }
    }
  }, [selectedChoice]);

  const selectChoiceImg = (src) =>
    !disableClick ? setSelectedChoice(src) : null;

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
              className={`display-two__captured-bottt ${
                levelsCompleted > 0 && "display-two__captured-bottt--found"
              }`}
              src={placeholderBottts.botttOne}
              alt="broken robot"
            />
            <img
              className={`display-two__captured-bottt ${
                levelsCompleted > 1 && "display-two__captured-bottt--found"
              }`}
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
            setSelectedChoice={selectChoiceImg}
            levelData={levelsData.levelOne.allBottts}
            levelsCompleted={levelsCompleted}
          />
        </div>
        <div className="dash">
          <h2 className="dash__header">Target Robot</h2>
          <div className="dash__target-robot">
            {!levelTransition && <img src={target} alt="target robot" />}
            {levelTransition && <LoadingBars />}
          </div>

          <h2 className="dash__header">Selected Robot</h2>
          <div
            className={`dash__target-robot ${
              wrongSelection &&
              target !== placeholderBottts.botttOne &&
              "dash__target-robot--incorrect"
            } ${
              correctSelection &&
              target !== placeholderBottts.botttOne &&
              "dash__target-robot--correct"
            } `}
          >
            {!levelTransition && (
              <img
                src={selectedChoice || placeholderBottts.botttOne}
                alt="target robot"
              />
            )}
            {levelTransition && <LoadingBars />}
          </div>
          <h2 className="dash__header">BB Chat</h2>
          <div className="dash__chat-box">
            <p className="dash__chat-text">
              {wrongSelection && "Cannot believe we hired you for this...."}
              {correctSelection && "Wow so you actually ARE good at something!"}
              {!correctSelection && !wrongSelection && "........"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gamepage;
