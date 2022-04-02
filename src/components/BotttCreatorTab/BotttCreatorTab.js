import "./BotttCreatorTab.scss";
import hammerGif from "../../assets/images/hammer.gif";
import skylineGif from "../../assets/images/skyline.gif";
import { useState } from "react";
import LevelStyler from "../LevelStyler/LevelStyler";
import { v4 as uuid } from "uuid";
import getBottts from "../../utils/botCreation";
import Button from "../Button/Button";
import { startCase } from "lodash";
import { renderBotImg } from "../../utils/botCreation";
import requests from "../../utils/requests";

const BotttCreator = ({ chevronImg, transitionPage }) => {
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
  const [placeholder, setPlaceHolder] = useState(false);

  const generateSeed = async () => {
    setLoadingSeed(true);
    let botttDetails = await getBottts(seedFormatting);
    botttDetails.seed = uuid();
    botttDetails.newSeed = false;
    setShowSeed(null);
    let postSeed = await requests.postSeedData(botttDetails);
    setTimeout(() => {
      console.log(botttDetails.seed);
      setShowSeed(botttDetails.seed);
      setTimeout(() => {
        setLoadingSeed(false);
      }, 1000);
    }, 4000);
    console.log(botttDetails);
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
          <h2 className="bottt-creator-screen__title">
            ASSEMBLY LINE{" "}
            <span className="bottt-creator-screen__title--section">
              {startCase(
                creationPage === "showSeed" ? "Overview" : creationPage
              )}
            </span>
          </h2>
          <div className="interactive-menu">
            <ul className="nav">
              <li className="nav__item">
                <Button
                  text="Level 1"
                  handleInput={() => setCreationPage("levelOne")}
                  additionalClass={"nav__btn"}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 2"
                  handleInput={() => setCreationPage("levelTwo")}
                  additionalClass={"nav__btn"}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 3"
                  handleInput={() => setCreationPage("levelThree")}
                  additionalClass={"nav__btn"}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 4"
                  handleInput={() => setCreationPage("levelFour")}
                  additionalClass={"nav__btn"}
                />
              </li>
              <li className="nav__item nav__item--seed-tab">
                <Button
                  text="Overview"
                  handleInput={() => setCreationPage("showSeed")}
                  additionalClass={"nav__btn"}
                />
              </li>
            </ul>
            <div className="interactive-menu__current-page">
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
                <div className="interactive-menu__seed-generation">
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
                  <Button text={"Confirm build"} handleInput={generateSeed} />

                  {showSeed && (
                    <h3 className="interactive-menu__rendered-seed">
                      {" "}
                      World Generated
                    </h3>
                  )}
                  {loadingSeed && !showSeed && (
                    <h3 className="interactive-menu__rendered-seed">
                      Building...
                    </h3>
                  )}
                  {!showSeed && !loadingSeed && <h3>Status</h3>}

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
                    <div className="interactive-menu__rendered-seed interactive-menu__rendered-seed--spacing">
                      {showSeed}
                    </div>
                  )}
                </div>
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
