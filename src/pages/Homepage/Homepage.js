import "./Homepage.scss";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import requests from "../../utils/requests";
import InputSingleLetter from "../../components/InputSingleLetter/InputSingleLetter";
import factorioImg from "../../assets/images/factorio.gif";
import chevronImg from "../../assets/images/chevron.svg";
import getBottts, { convertSeedData } from "../../utils/botCreation";
import Loadingpage from "../Loadingpage/Loadingpage";
import HighscoreTab from "../../components/HighscoreTab/HighscoreTab";
import BotttCreator from "../../components/BotttCreatorTab/BotttCreatorTab";
import AllSeedsTab from "../../components/AllSeedsTab/AllSeedsTab";
import RadioInput from "../../components/Radio/Radio";
import Button from "../../components/Button/Button";
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

const Homepage = ({ setUserName, setLevelsData, newRecord }) => {
  const [userCharOne, setUserCharOne] = useState("");
  const [userCharTwo, setUserCharTwo] = useState("");
  const [userCharThree, setUserCharThree] = useState("");
  const [seed, setSeed] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [error, setError] = useState(false);
  const [invalidSeed, setInvalidSeed] = useState(null);
  const [highscores, setHighscores] = useState(null);
  const [initalRender, setInitialRender] = useState(true);
  const [transitiongTabs, setTransitioningTabs] = useState(false);
  const [showSeedField, setShowSeedField] = useState(false);
  const [currentView, setCurrentView] = useState("main");
  const [newSeed, setNewSeed] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(async () => {
    if (location.pathname.includes("view-highscores")) {
      setCurrentView("highscores");
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
        return input.value === "true"
          ? setShowSeedField(true)
          : (() => {
              setShowSeedField(false);
              setSeed("");
            })();
    }
  };

  const transitionPage = (location) => {
    if (!transitiongTabs) {
      switch (location) {
        case "forge":
          setCurrentView("forge");
          break;
        case "forge-to-main":
          setCurrentView("forge-to-main");
          break;
        case "highscores":
          setCurrentView("highscores");
          break;
        case "highscores-to-main":
          setCurrentView("highscores-to-main");
          break;
        case "all-seeds":
          setCurrentView("all-seeds");
          break;
        case "north-to-main":
          setCurrentView("north-to-main");
          break;
      }
      setTransitioningTabs(true);
      setInitialRender(false);
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
      if (!seed && !showSeedField) {
        bottts = await getBottts(null);
        const randomName = uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          separator: "-",
        });
        bottts.seed = randomName;
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
      setInvalidSeed(false);
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
    <>
      <AllSeedsTab
        transitionPage={transitionPage}
        chevronImg={chevronImg}
        currentView={currentView}
        newSeed={newSeed}
      />
      <div
        className={`screen-wrapper ${
          currentView === "forge" && "screen-wrapper--shift-right"
        } ${
          currentView === "forge-to-main" &&
          "screen-wrapper--shift-left-to-main"
        } ${currentView === "highscores" && "screen-wrapper--shift-left"} ${
          currentView === "highscores-to-main" &&
          "screen-wrapper--shift-right-to-main"
        } ${currentView === "all-seeds" && "screen-wrapper--shift-down"} ${
          currentView === "north-to-main" && "screen-wrapper--shift-up"
        }`}
      >
        <BotttCreator
          transitionPage={transitionPage}
          chevronImg={chevronImg}
          setNewSeed={setNewSeed}
        />
        <div className="home-screen-wrapper">
          {gameStart && <Loadingpage page={"home"} />}

          <img
            alt="chevron"
            src={chevronImg}
            className="chevron chevron--mouse-leave"
            onMouseOver={() => {
              setTimeout(() => {
                transitionPage("highscores");
              }, 200);
            }}
          />
          <img
            alt="chevron"
            src={chevronImg}
            className="chevron chevron--north chevron--mouse-leave"
            onMouseOver={() => {
              setTimeout(() => {
                transitionPage("all-seeds");
              }, 200);
            }}
          />
          <img
            alt="chevron"
            src={chevronImg}
            className="chevron chevron--flipped chevron--mouse-leave"
            onMouseOver={() => {
              setTimeout(() => {
                transitionPage("forge");
              }, 200);
            }}
          />
          <div className="background-img-container">
            <section className="home-screen">
              <h1 className="home-screen__title">Broken Bottts</h1>
              <p className="home-screen__welcome-message">
                Welcome to Broken Bottts! You have been tasked with finding and
                removing the robots we have discovered to have been infected
                with a malicious yet inefficent virus...android operating
                software. You have been tasked too remove these robots from our
                operation as quickly as possible. If you can complete this in an
                adequte amount of time we will offer you a promotion from your
                position as intern to senior intern. Don't mess this up.
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
                  <label htmlFor="yes-seed">Yes</label>
                  <RadioInput
                    name={"seed-option"}
                    id={"yes-seed"}
                    value={true}
                    handleInput={handleInput}
                  />

                  <label htmlFor="no-seed">No</label>
                  <RadioInput
                    name={"seed-option"}
                    id={"yes-seed"}
                    value={false}
                    handleInput={handleInput}
                    defaultChecked={true}
                  />
                </div>

                <input
                  className={`home-screen__seed-input  ${
                    gameStart &&
                    showSeedField &&
                    "home-screen__seed-input--checked"
                  } ${showSeedField && "home-screen__seed-input--show-field"} ${
                    invalidSeed &&
                    showSeedField &&
                    "home-screen__seed-input--error"
                  }`}
                  onChange={handleInput}
                  name="seed"
                  disabled={showSeedField ? "" : "disabled"}
                />

                <p
                  className={`home-screen__seed-input--error-message ${
                    invalidSeed && "home-screen__seed-input--error-message-show"
                  }`}
                >
                  Invalid seed. Please enter a valid seed or continue with a
                  randomized seed.
                </p>
                <Button handleInput={startGame} text="Start" />
                <div className="home-screen__menu-options">
                  <Button
                    handleInput={(e) => {
                      e.preventDefault();
                      transitionPage("forge");
                    }}
                    text="Assembly Line"
                  />
                  <Button
                    handleInput={(e) => {
                      e.preventDefault();
                      transitionPage("all-seeds");
                    }}
                    text="World list"
                  />
                  <Button
                    handleInput={(e) => {
                      e.preventDefault();
                      transitionPage("highscores");
                    }}
                    text="Highscores"
                  />
                </div>
              </form>
            </section>
            <img
              className="menu-background"
              src={factorioImg}
              alt="factorio gif"
            />
          </div>
        </div>
        <HighscoreTab
          setCurrentView={setCurrentView}
          initalRender={initalRender}
          chevronImg={chevronImg}
          transitionPage={transitionPage}
          highscores={highscores}
          newRecord={newRecord}
        />
      </div>
    </>
  );
};

export default Homepage;
