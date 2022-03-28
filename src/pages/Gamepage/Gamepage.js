import "./Gamepage.scss";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import useTimer from "../../hooks/Timer";
import formatTime from "../../utils/formatTime";
import { getBrokenBottts } from "../../utils/botCreation";
import LoadingBars from "../../components/LoadingBars/LoadingBars";
import LevelOne from "../../components/LevelOne/LevelOne";
import LevelTwo from "../../components/LevelTwo/LevelTwo";
import LevelThree from "../../components/LevelThree/LevelThree";

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
  const [levelOneComplete, setLevelOneComplete] = useState(false);
  const [levelTwoComplete, setLevelTwoComplete] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (!levelsData) return history.push("/");
    setTarget(levelsData.levelOne.targetBottt);
    // startTimer();
    setPlaceholderBottts(getBrokenBottts());
  }, []);

  useEffect(() => {
    if (!disableClick && (selectedChoice !== "" || target !== "")) {
      if (selectedChoice === target) {
        setWrongSelection(false);
        setCorrectSelection(true);
        setDisableClick(true);
        setTimeout(() => {
          let levelsCompletedCopy = levelsCompleted.valueOf() + 1;
          setCorrectSelection(false);
          setDisableClick(false);
          setLevelsCompleted(levelsCompletedCopy);

          setPlaceholderBottts({
            ...placeholderBottts,
            botttOne:
              levelsCompletedCopy === 1
                ? selectedChoice
                : placeholderBottts.botttOne,
            botttTwo:
              levelsCompletedCopy === 2
                ? selectedChoice
                : placeholderBottts.botttTwo,
            botttThree:
              levelsCompletedCopy === 3
                ? selectedChoice
                : placeholderBottts.botttThree,
            botttFour:
              levelsCompletedCopy === 4
                ? selectedChoice
                : placeholderBottts.botttFour,
          });

          setLevelTransition(true);
          setTimeout(() => {
            if (levelsCompletedCopy === 1) {
              setLevelOneComplete(true);
              setTarget(levelsData.levelTwo.targetBottt);
              setSelectedChoice(null);
            } else if (levelsCompletedCopy === 2) {
              setLevelTwoComplete(true);
              setTarget(levelsData.levelThree.targetBottt);
              setSelectedChoice(null);
            } else if (levelsCompletedCopy === 3) {
              setTarget(levelsData.levelFour.targetBottt);
              setSelectedChoice(null);
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
              className={`display-two__captured-bottt ${
                levelsCompleted > 2 && "display-two__captured-bottt--found"
              }`}
              src={placeholderBottts.botttThree}
              alt="broken robot"
            />{" "}
            <img
              className={`display-two__captured-bottt ${
                levelsCompleted > 3 && "display-two__captured-bottt--found"
              }`}
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
        <div
          className={`game-page__screen ${
            wrongSelection && "game-page__screen--incorrect"
          }`}
        >
          <LevelOne
            completed={levelOneComplete}
            setSelectedChoice={selectChoiceImg}
            levelData={levelsData.levelOne.allBottts}
            levelsCompleted={levelsCompleted}
          />
          <LevelTwo
            previousComplete={levelOneComplete}
            setSelectedChoice={selectChoiceImg}
            levelData={levelsData.levelTwo.allBottts}
            levelsCompleted={levelsCompleted}
          />
          <LevelThree
            previousComplete={levelTwoComplete}
            setSelectedChoice={selectChoiceImg}
            levelData={levelsData.levelThree.allBottts}
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
            className={`dash__target-robot 
             ${!selectedChoice && "dash__target-robot--empty"}
            ${
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
              <>
                {selectedChoice && (
                  <img src={selectedChoice} alt="target robot" />
                )}
              </>
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
