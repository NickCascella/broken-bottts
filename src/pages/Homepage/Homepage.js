import "./Homepage.scss";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import requests from "../../utils/requests";
import InputSingleLetter from "../../components/InputSingleLetter/InputSingleLetter";
import factorioImg from "../../assets/images/factorio.gif";
import circuitsImg from "../../assets/images/circuits.gif";
import chevronImg from "../../assets/images/chevron.svg";
import getBottts, { convertSeedData } from "../../utils/botCreation";
import Loadingpage from "../Loadingpage/Loadingpage";
import HighscoreTable from "../../components/HighscoreTable/HighscoreTable";

const Homepage = ({ setUserName, setLevelsData }) => {
  const [userCharOne, setUserCharOne] = useState("");
  const [userCharTwo, setUserCharTwo] = useState("");
  const [userCharThree, setUserCharThree] = useState("");
  const [seed, setSeed] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [error, setError] = useState(false);
  const [invalidSeed, setInvalidSeed] = useState(null);
  const [viewHighscores, setViewHighscores] = useState(false);
  const [highscores, setHighscores] = useState(null);
  const [initalRender, setInitialRender] = useState(true);
  const [transitiongTabs, setTransitioningTabs] = useState(false);
  const [showSeedField, setShowSeedField] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(async () => {
    if (location.pathname === "/home-highscores") {
      setViewHighscores(true);
    }
    const highscores = await requests.getHighscores();

    setHighscores(highscores);
  }, []);

  const handleInput = (e) => {
    const input = e.target;
    switch (input.name) {
      case "firstLetter":
        setUserCharOne(input.value);
        break;
      case "secondLetter":
        setUserCharTwo(input.value);
        break;
      case "thirdLetter":
        setUserCharThree(input.value);
        break;
      case "seed":
        setSeed(input.value);
        break;
      case "seed-option":
        input.value === "true"
          ? setShowSeedField(true)
          : setShowSeedField(false);
        break;
    }
  };

  const transitionPage = () => {
    if (!transitiongTabs) {
      setInitialRender(false);
      setViewHighscores(!viewHighscores);
      setTransitioningTabs(true);
      setTimeout(() => {
        setTransitioningTabs(false);
      }, 1000);
    }
  };

  const startGame = async (e) => {
    e.preventDefault();
    if (userCharOne && userCharTwo && userCharThree) {
      let bottts = {};
      let fullName = `${userCharOne}${userCharTwo}${userCharThree}`;
      if (!seed) {
        bottts = await getBottts();
        bottts.seed = uuid();
        bottts.newSeed = true;
        setSeed(bottts.seed);
        let postSeedData = await requests.postSeedData(bottts);
      } else {
        const seedData = await requests.getSeedData(seed);
        if (!seedData) {
          setInvalidSeed(true);
          return;
        }
        setInvalidSeed(false);
        bottts = convertSeedData(seedData);
        bottts.seed = seedData.seed;
        bottts.newSeed = false;
      }

      setLevelsData(bottts);
      setUserName(fullName);
      setGameStart(true);
      setTimeout(() => {
        setGameStart(false);
        history.push("/broken-bottts");
      }, 7000);
      return;
    }
    setError(true);
  };

  return (
    <div className="screen-wrapper">
      {gameStart && <Loadingpage page={"home"} />}
      <div
        className={`home-screen-wrapper  ${
          !viewHighscores && !initalRender && "home-screen-wrapper--shift-right"
        } ${viewHighscores && "home-screen-wrapper--shift-left"}`}
      >
        <img
          alt="chevron"
          src={chevronImg}
          className="chevron chevron--mouse-leave"
          onMouseOver={() => {
            setTimeout(() => {
              transitionPage();
            }, 200);
          }}
        />
        <div className="background-img-container">
          <section className="home-screen">
            <h1 className="home-screen__title">Broken Bottts</h1>
            <p className="home-screen__welcome-message">
              Welcome to Broken Bottts! You have been tasked with finding and
              removing the robots we have discovered to have been infected with
              a malicious yet inefficent virus...android operating software. You
              have been tasked too remove these robots from our operation as
              quickly as possible. If you can complete this in an adequte amount
              of time we will offer you a promotion from your position as intern
              to senior intern. Don't mess this up.
            </p>
            <form className="home-screen__form">
              <h2 className="home-screen__credentials-title">Credentials</h2>
              <div>
                <InputSingleLetter
                  onChange={handleInput}
                  name={"firstLetter"}
                  value={userCharOne}
                  error={error}
                  gameStart={gameStart}
                />
                <InputSingleLetter
                  onChange={handleInput}
                  name={"secondLetter"}
                  value={userCharTwo}
                  error={error}
                  gameStart={gameStart}
                />
                <InputSingleLetter
                  onChange={handleInput}
                  name={"thirdLetter"}
                  value={userCharThree}
                  error={error}
                  gameStart={gameStart}
                />
              </div>
              <label className="home-screen__seed-title" htmlFor="seed">
                SEED?
              </label>
              <div className="home-screen__enable-seed-wrapper">
                <label className="" htmlFor="yes-seed">
                  Yes
                </label>
                <input
                  type="radio"
                  name="seed-option"
                  id="yes-seed"
                  value={true}
                  onChange={handleInput}
                  className="home-screen__enable-seed-btn"
                />
                <label className="" htmlFor="no-seed">
                  No
                </label>
                <input
                  defaultChecked
                  id="no-seed"
                  type="radio"
                  name="seed-option"
                  value={false}
                  onChange={handleInput}
                  className="home-screen__enable-seed-btn"
                />
              </div>

              <input
                className={`home-screen__seed-input ${
                  invalidSeed &&
                  showSeedField &&
                  "home-screen__seed-input--error"
                } ${
                  gameStart &&
                  showSeedField &&
                  "home-screen__seed-input--checked"
                } ${showSeedField && "home-screen__seed-input--show-field"}`}
                onChange={handleInput}
                name="seed"
                disabled={showSeedField ? "" : "disabled"}
              />
              {invalidSeed && (
                <p className="home-screen__seed-input--error">
                  Invalid seed. Please enter a valid seed or continue with a
                  randomized seed.
                </p>
              )}
              <button className="home-screen__proceed-btn" onClick={startGame}>
                Proceed
              </button>
              <button
                className="home-screen__proceed-btn"
                onClick={(e) => {
                  e.preventDefault();
                  transitionPage();
                }}
              >
                Highscores
              </button>
            </form>
          </section>
          <img
            className="menu-background"
            src={factorioImg}
            alt="factorio gif"
          />
        </div>
      </div>
      <div
        className={`highscores-tab-wrapper  ${
          !viewHighscores &&
          !initalRender &&
          "highscores-tab-wrapper--shift-right"
        } ${viewHighscores && "highscores-tab-wrapper--shift-left"}`}
      >
        <img
          alt="chevron"
          src={chevronImg}
          className="chevron chevron--flipped"
          onMouseOver={() => {
            setTimeout(() => {
              transitionPage();
            }, 200);
          }}
        />
        <div className="highscores-tab__wrap">
          <div className="background-img-container">
            <section className="highscore-screen">
              <h2 className="highscore-screen__title">TOP 5 HIGHSCORES</h2>
              {highscores && <HighscoreTable list={highscores.randomRuns} />}
              <h2 className="highscore-screen__title--not-first">
                TOP 5 ANY % HIGHSCORES
              </h2>
              {highscores && <HighscoreTable list={highscores.seededRuns} />}
              <button
                className="home-screen__proceed-btn"
                onClick={() => {
                  setInitialRender(false);
                  setViewHighscores(!viewHighscores);
                }}
              >
                Home
              </button>
            </section>
            <img
              className="menu-background menu-background--colour-one"
              src={circuitsImg}
              alt="circuits gif"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
