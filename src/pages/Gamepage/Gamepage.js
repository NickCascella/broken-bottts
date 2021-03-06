import "./Gamepage.scss";
import goodBinary from "../../assets/images/goodBinary.gif";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import requests from "../../utils/requests";
import { getBrokenBottts } from "../../utils/botCreation";
import LoadingBars from "../../components/LoadingBars/LoadingBars";
import Loadingpage from "../Loadingpage/Loadingpage";
import LevelOne from "../../components/LevelOne/LevelOne";
import LevelTwo from "../../components/LevelTwo/LevelTwo";
import LevelThree from "../../components/LevelThree/LevelThree";
import LevelFour from "../../components/LevelFour/LevelFour";
import Timer from "../../components/Timer/Timer";

const Gamepage = ({ userName, levelsData, setNewRecord }) => {
  const [placeholderBottts, setPlaceholderBottts] = useState({});
  const [target, setTarget] = useState("");
  const [wrongSelection, setWrongSelection] = useState(false);
  const [correctSelection, setCorrectSelection] = useState(false);
  const [disableClick, setDisableClick] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [levelsCompleted, setLevelsCompleted] = useState(0);
  const [levelTransition, setLevelTransition] = useState(false);
  const [levelOneComplete, setLevelOneComplete] = useState(false);
  const [levelTwoComplete, setLevelTwoComplete] = useState(false);
  const [time, setTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [highscores, setHighscores] = useState(null);
  const [playerRecord, setPlayerRecord] = useState(null);
  const [audio, setAudio] = useState(null);

  let history = useHistory();

  useEffect(() => {
    if (!levelsData || !userName) return history.push("/");
    setTarget(levelsData.levelOne.targetBottt);
    setPlaceholderBottts(getBrokenBottts());
    setNewRecord(null);
  }, []);

  useEffect(() => {
    const audio = new Audio(
      "https://badboygaming.github.io/html5game/snd_gamesong.ogg"
    );
    audio.volume = 0.0003;
    audio.play();
    setAudio(audio);
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
              audio.pause();
              setTimeout(() => {
                history.push("/home/view-highscores");
              }, 19000);
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
    const gameEnd = async () => {
      if (gameOver) {
        audio.pause();
        const playerRecord = {
          name: userName,
          time: time,
          seed: levelsData.seed,
          newSeed: levelsData.newSeed,
        };
        const highscores = await requests.getHighscores();
        setHighscores(highscores);
        setPlayerRecord(playerRecord);
        if (playerRecord.newSeed) {
          let checkInTopFive = highscores.randomRuns.some((run) => {
            return playerRecord.time < run.time;
          });
          if (checkInTopFive) {
            setNewRecord(playerRecord);
            const postHighscore = await requests.postHighscore(playerRecord);
          }
        } else {
          let checkInTopFive = highscores.seededRuns.some(
            (run) => playerRecord.time < run.time
          );
          if (checkInTopFive) {
            setNewRecord(playerRecord);
            const postHighscore = await requests.postHighscore(playerRecord);
          }
        }
      }
    };
    gameEnd();
  }, [gameOver]);

  const selectChoiceImg = (src) =>
    !disableClick ? setSelectedChoice(src) : null;

  if (!placeholderBottts.botttOne) {
    return <div className="placeholder">Error unable to load game data.</div>;
  }

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
              <span className="display-one__name-seed--title">
                {" "}
                FACTORY ID:
              </span>{" "}
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
            <Timer
              setTime={setTime}
              levelsCompleted={levelsCompleted}
              setDisableClick={setDisableClick}
            />
          </div>
        </section>
        <div className="game-page__game-wrapper">
          <div
            className={`game-page__screen ${
              wrongSelection && !gameOver && "game-page__screen--incorrect"
            } `}
          >
            {highscores && playerRecord && (
              <Loadingpage
                page={"end-game"}
                playerRecord={playerRecord}
                highscores={highscores}
              />
            )}

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
            <h2 className="dash__header">Alerts</h2>
            <div
              className={`dash__chat-box ${
                gameOver && "dash__chat-box--game-over"
              }`}
            >
              <p className="dash__chat-text">
                {wrongSelection && "Cannot believe we hired you for this...."}
                {correctSelection &&
                  "Wow so you actually ARE good at something!"}
                {!correctSelection && !wrongSelection && (
                  <span className="dash__chat-text--animated">...</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gamepage;
