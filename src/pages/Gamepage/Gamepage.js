import "./Gamepage.scss";
import goodBinary from "../../assets/images/goodBinary.gif";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getBrokenBottts } from "../../utils/botCreation";
import LoadingBars from "../../components/LoadingBars/LoadingBars";
import Loadingpage from "../Loadingpage/Loadingpage";
import LevelOne from "../../components/LevelOne/LevelOne";
import LevelTwo from "../../components/LevelTwo/LevelTwo";
import LevelThree from "../../components/LevelThree/LevelThree";
import LevelFour from "../../components/LevelFour/LevelFour";
import Timer from "../../components/Timer/Timer";

const Gamepage = ({ userName, levelsData }) => {
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
  const [levelThreeComplete, setLevelThreeComplete] = useState(false);
  const [time, setTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (!levelsData) return history.push("/");
    setTarget(levelsData.levelOne.targetBottt);
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
          setDisableClick(true);
          setTimeout(() => {
            if (levelsCompletedCopy === 1) {
              setLevelOneComplete(true);
              setTarget(levelsData.levelTwo.targetBottt);
            } else if (levelsCompletedCopy === 2) {
              setLevelTwoComplete(true);
              setTarget(levelsData.levelThree.targetBottt);
            } else if (levelsCompletedCopy === 3) {
              setTarget(levelsData.levelFour.targetBottt);
            } else if (levelsCompletedCopy === 4) {
              setTarget(levelsData.levelOne.targetBottt);
              setGameOver(true);
            }
            setSelectedChoice(null);
            setLevelTransition(false);
            setDisableClick(false);
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

  useEffect(() => {
    if (gameOver) {
      const playerRecord = {
        time: time,
        seed: levelsData.seed,
        newSeed: levelsData.newSeed,
      };
    }
  }, [gameOver]);

  const selectChoiceImg = (src) =>
    !disableClick ? setSelectedChoice(src) : null;

  if (!placeholderBottts.botttOne)
    return <div style={{ backgroundColor: "black" }}></div>;

  return (
    <>
      <Loadingpage page={"game"} />
      <section className={`game-page ${gameOver && "game-page--game-over"}`}>
        <section className="game-page__header">
          <div className="display-one">
            <p className="display-one__name-seed display-one__name-seed--name">
              <span className="display-one__name-seed--title">NAME:</span>{" "}
              {userName || "Unknown Entity"}
            </p>
            <p className="display-one__name-seed">
              <span className="display-one__name-seed--title"> FACTORY:</span>{" "}
              {levelsData.seed}
            </p>
          </div>
          <div className="display-two">
            <h1 className="display-two__name">Broken Bottts</h1>
            <div
              className={`display-two__captured-bottts ${
                gameOver && "display-two__captured-bottts--game-over"
              }`}
            >
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
            <Timer setTime={setTime} levelsCompleted={levelsCompleted} />
          </div>
        </section>
        <div className="game-page__game-wrapper">
          <div
            className={`game-page__screen ${
              wrongSelection && "game-page__screen--incorrect"
            } ${gameOver && "game-page__screen--game-over"}`}
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
            <LevelFour
              previousComplete={levelThreeComplete}
              setSelectedChoice={selectChoiceImg}
              levelData={levelsData.levelFour.allBottts}
              levelsCompleted={levelsCompleted}
            />
          </div>
          <div className="dash">
            <h2 className="dash__header">Target Robot</h2>
            <div
              className={`dash__target-robot ${
                gameOver && "dash__target-robot--game-over"
              }`}
            >
              {!levelTransition && !gameOver && (
                <img src={target} alt="target robot" />
              )}
              {gameOver && (
                <img
                  className="dash__target-robot--img"
                  src={goodBinary}
                  alt="target robot"
                />
              )}
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
              } ${gameOver && "dash__target-robot--game-over"}`}
            >
              {!levelTransition && (
                <>
                  {selectedChoice && !gameOver && (
                    <img src={selectedChoice} alt="target robot" />
                  )}
                  {gameOver && (
                    <img
                      className="dash__target-robot--img"
                      src={goodBinary}
                      alt="target robot"
                    />
                  )}
                </>
              )}
              {levelTransition && <LoadingBars />}
            </div>
            <h2 className="dash__header">BB Chat</h2>
            <div
              className={`dash__chat-box ${
                gameOver && "dash__chat-box--game-over"
              }`}
            >
              <p className="dash__chat-text">
                {wrongSelection && "Cannot believe we hired you for this...."}
                {correctSelection &&
                  "Wow so you actually ARE good at something!"}
                {!correctSelection && !wrongSelection && "........"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gamepage;
