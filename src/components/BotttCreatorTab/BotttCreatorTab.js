import "./BotttCreatorTab.scss";
import hammerGif from "../../assets/images/hammer.gif";
import skylineGif from "../../assets/images/skyline.gif";
import { useState } from "react";
import LevelStyler from "../LevelStyler/LevelStyler";
import getBottts from "../../utils/botCreation";
import Button from "../Button/Button";
import { startCase } from "lodash";
import { renderBotImg } from "../../utils/botCreation";
import requests from "../../utils/requests";
import TextArea from "../TextArea/TextArea";
import TextInput from "../TextInput/TextInput";
import gearsGif from "../../assets/images/gears.gif";

const BotttCreator = ({ chevronImg, transitionPage, setNewSeed }) => {
  const [creationPage, setCreationPage] = useState("levelOne");
  const [loadingSeed, setLoadingSeed] = useState(false);
  const [seedFormatting, setSeedFormatting] = useState({
    levelOne: null,
    levelTwo: null,
    levelThree: null,
    levelFour: null,
    seed: null,
  });
  const [showSeed, setShowSeed] = useState(false);
  const [seedName, setSeedName] = useState("");
  const [seedDescription, setSeedDescription] = useState("");
  const [seedNameCopy, setSeedNameCopy] = useState("");
  const [error, setError] = useState("");

  const generateSeed = async (e) => {
    e.preventDefault();
    setError("");
    let botttDetails = await getBottts(seedFormatting);
    botttDetails.seed = seedName;
    botttDetails.description = seedDescription;
    botttDetails.newSeed = false;
    setShowSeed(null);
    let postSeed = await requests.postSeedData(botttDetails);
    if (postSeed.message === "Seed stored successfully") {
      setLoadingSeed(true);
      setSeedNameCopy(seedName);
      setNewSeed(botttDetails.seed);
      setTimeout(() => {
        setShowSeed(botttDetails.seed);
        setTimeout(() => {
          setLoadingSeed(false);
        }, 1000);
      }, 4000);
    } else {
      setError(postSeed.message);
    }
  };

  const tableRow = (level, obj) => {
    return (
      <div className="overview-table__row">
        <div className="overview-table__block">{level}</div>
        <img
          className="overview-table__img overview-table__block"
          src={renderBotImg(obj.targetBotttObjInfo)}
          alt="Robot"
        />
        <img
          className="overview-table__img overview-table__block"
          src={
            obj.allBotttsObjInfo[0]
              ? renderBotImg(obj.allBotttsObjInfo[0])
              : renderBotImg(obj.allBotttsObjInfo)
          }
          alt="Robot"
        />
        <div className="overview-table__block">
          {obj.generalBotttDifferences}
        </div>
      </div>
    );
  };

  return (
    <div className="bottt-creator-tab-wrapper">
      <img
        alt="chevron"
        src={chevronImg}
        className="chevron chevron--mouse-leave"
        onMouseOver={() => {
          setTimeout(() => {
            transitionPage("forge-to-main");
          }, 200);
        }}
      />
      <div className="background-img-container">
        <section className="bottt-creator-screen">
          <div className="bottt-creator-screen__header">
            <h2 className="bottt-creator-screen__title">
              <span>ASSEMBLY LINE </span>
              <span className="bottt-creator-screen__title--section">
                {startCase(
                  creationPage === "showSeed" ? "Overview" : creationPage
                )}
              </span>
            </h2>
            <img
              alt="gears"
              src={gearsGif}
              className={"bottt-creator-screen__header-gears-gif"}
            />
          </div>
          <div className="interactive-menu">
            <ul className="nav">
              <li className="nav__item">
                <Button
                  text="Level 1"
                  handleInput={() => setCreationPage("levelOne")}
                  additionalClass={`nav__btn ${
                    creationPage === "levelOne" ? "nav__btn--active" : ""
                  }`}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 2"
                  handleInput={() => setCreationPage("levelTwo")}
                  additionalClass={`nav__btn ${
                    creationPage === "levelTwo" ? "nav__btn--active" : ""
                  }`}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 3"
                  handleInput={() => setCreationPage("levelThree")}
                  additionalClass={`nav__btn ${
                    creationPage === "levelThree" ? "nav__btn--active" : ""
                  }`}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 4"
                  handleInput={() => setCreationPage("levelFour")}
                  additionalClass={`nav__btn ${
                    creationPage === "levelFour" ? "nav__btn--active" : ""
                  }`}
                />
              </li>
              <li className="nav__item  nav__item--seed-tab">
                <Button
                  text="Overview"
                  handleInput={() => setCreationPage("showSeed")}
                  additionalClass={`nav__btn ${
                    creationPage === "showSeed" ? "nav__btn--active" : ""
                  }`}
                />
              </li>
              <li className="nav__item ">
                <Button
                  text="Instructions"
                  handleInput={() => setCreationPage("instructions")}
                  additionalClass={`nav__btn ${
                    creationPage === "instructions" ? "nav__btn--active" : ""
                  }`}
                />
              </li>
              <li className="nav__item ">
                <Button
                  text="Home"
                  handleInput={() => transitionPage("forge-to-main")}
                  additionalClass={`nav__btn`}
                />
              </li>
            </ul>
            <div className="interactive-menu__current-page">
              {creationPage === "instructions" && (
                <section className="instructions">
                  <h2 className="instructions__title">
                    Welcome to the Assembly Line human!
                  </h2>
                  <h3 className="instructions__sub-title">
                    This guide is meant to help you understand how to create and
                    customize your own lineup for other players to enjoy.
                  </h3>
                  <ul className="instructions__list">
                    <li className="instructions__list-item">
                      Start by selecting any of the level tabs.
                    </li>
                    <li className="instructions__list-item">
                      In the level tabs you will see the page is divided into
                      two sections which are colour coded.
                    </li>
                    <li className="instructions__list-item">
                      The top half is for your Target, what the players will be
                      trying to find. The bottom half is the template for all
                      other bottts surrounding your target, labeled as the
                      General Bottt.
                    </li>
                    <li className="instructions__list-item">
                      Both sections are identical in their customization
                      features, however the General Bottt section has an
                      additional radio input for setting the levels of
                      differentiation. This setting will only alter the
                      appearance of the general bottts and not the target.
                      <ul className="instructions__list--sub-list">
                        <li className="instructions__list-item">
                          <span className="instructions__list-item--coloured">
                            Choosing Exact
                          </span>
                          , will make all the bottts that are not the target
                          identical to one another.
                        </li>
                        <li className="instructions__list-item">
                          <span className="instructions__list-item--coloured">
                            Choosing Similar
                          </span>
                          , will make all the bottts that are not the target
                          have the same secondary characteristics such as
                          colour, rotation, and texture chance. The difference
                          being the facial structure will be randomized.
                        </li>
                        <li className="instructions__list-item">
                          <span className="instructions__list-item--coloured">
                            Choosing Different{" "}
                          </span>{" "}
                          will make all the bottts unique from one another.
                        </li>
                      </ul>
                    </li>
                    <li className="instructions__list-item">
                      Once you are finished customizing your assembly line you
                      can click the Overview tab to review all your settings.
                      Once you are satisfied, you name your assembly line,
                      optionally give a brief description for it, then confirm
                      the submission.
                    </li>
                    <li className="instructions__list-item">
                      That's it! You can now share your seed for others to play.
                      Enjoy! :)
                    </li>
                  </ul>
                </section>
              )}
              <LevelStyler
                setSeedFormatting={setSeedFormatting}
                seedFormatting={seedFormatting}
                level={"levelOne"}
                currentLevelView={creationPage}
              />
              {seedFormatting.levelOne && (
                <LevelStyler
                  setSeedFormatting={setSeedFormatting}
                  seedFormatting={seedFormatting}
                  level={"levelTwo"}
                  currentLevelView={creationPage}
                />
              )}
              {seedFormatting.levelTwo && (
                <LevelStyler
                  setSeedFormatting={setSeedFormatting}
                  seedFormatting={seedFormatting}
                  level={"levelThree"}
                  currentLevelView={creationPage}
                />
              )}
              {seedFormatting.levelThree && (
                <LevelStyler
                  setSeedFormatting={setSeedFormatting}
                  seedFormatting={seedFormatting}
                  level={"levelFour"}
                  currentLevelView={creationPage}
                />
              )}
              {creationPage === "showSeed" && (
                <form className="interactive-menu__seed-generation">
                  <div className="overview-table">
                    <div className="overview-table__headers">
                      <div className="overview-table__block">Level</div>
                      <div className="overview-table__block">Target</div>
                      <div className="overview-table__block">Generals</div>
                      <div className="overview-table__block">
                        Differentiation
                      </div>
                    </div>
                    <div className="overview-table__rows">
                      {tableRow("One", seedFormatting.levelOne)}
                      {tableRow("Two", seedFormatting.levelTwo)}
                      {tableRow("Three", seedFormatting.levelThree)}
                      {tableRow("Four", seedFormatting.levelFour)}
                    </div>
                  </div>
                  <div className="interactive-menu__overview-inputs">
                    <div>
                      <label htmlFor="seed-name-input">Assembly ID:</label>
                      <TextInput
                        id={"seed-name-input"}
                        additionalClassNames={
                          error && "interactive-menu__text-input--error"
                        }
                        value={seedName}
                        handleInput={(e) => {
                          setSeedName(e.target.value);
                          setError(false);
                        }}
                        maxLength={15}
                      />
                    </div>
                    <Button text={"Confirm build"} handleInput={generateSeed} />
                  </div>
                  <TextArea
                    additionalClasses={"interactive-menu__text-area"}
                    placeHolder={
                      "(Optional) Write a brief description of your assembly line here..."
                    }
                    maxLength={80}
                    value={seedDescription}
                    handleInput={(e) => {
                      setSeedDescription(e.target.value);
                    }}
                  />
                  {!seedName && !showSeed && (
                    <h3 className="interactive-menu__rendered-seed">
                      Need to name your assembly line!
                    </h3>
                  )}
                  {error && seedName && (
                    <h3 className="interactive-menu__rendered-seed">
                      <span className="interactive-menu__rendered-seed--name">
                        {seedName}
                      </span>{" "}
                      {error}
                    </h3>
                  )}
                  {showSeed && (
                    <h3 className="interactive-menu__rendered-seed">
                      <span className="interactive-menu__rendered-seed--name">
                        {seedNameCopy}
                      </span>{" "}
                      generated
                    </h3>
                  )}
                  {loadingSeed && !showSeed && (
                    <h3 className="interactive-menu__rendered-seed">
                      Building{" "}
                      <span className="interactive-menu__rendered-seed--name interactive-menu__rendered-seed--animated">
                        {seedName}
                      </span>
                    </h3>
                  )}
                  {!showSeed && !loadingSeed && !error && seedName && (
                    <h3 className="interactive-menu__rendered-seed interactive-menu__rendered-seed--animated">
                      Pending submission
                    </h3>
                  )}
                  <div className="interactive-menu__loading-bar">
                    {loadingSeed && (
                      <div className="interactive-menu__loading-bar-track">
                        {!showSeed && (
                          <img
                            className="interactive-menu__loading-gif"
                            src={hammerGif}
                            alt="hammer gif"
                          />
                        )}
                      </div>
                    )}
                    {showSeed && (
                      <div className="interactive-menu__loading-bar-track--loaded"></div>
                    )}
                  </div>

                  {showSeed && (
                    <div className="interactive-menu__rendered-seed interactive-menu__rendered-seed--spacing interactive-menu__rendered-seed--name">
                      {showSeed}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
        <img
          className="menu-background menu-background--colour-two"
          src={skylineGif}
          alt="factorio gif"
        />
      </div>
    </div>
  );
};

export default BotttCreator;
