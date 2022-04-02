import "./BotttCreatorTab.scss";
import forgeGif from "../../assets/images/forge.gif";
import skylineGif from "../../assets/images/skyline.gif";
import { useState } from "react";
import LevelStyler from "../LevelStyler/LevelStyler";
import { v4 as uuid } from "uuid";
import getBottts from "../../utils/botCreation";
import Button from "../Button/Button";

const BotttCreator = ({ chevronImg, transitionPage }) => {
  const [creationPage, setCreationPage] = useState("levelOne");
  const [seedFormatting, setSeedFormatting] = useState({
    levelOne: null,
    levelTwo: null,
    levelThree: null,
    levelFour: null,
  });

  const generateSeed = async () => {
    let botttDetails = await getBottts(seedFormatting);
    botttDetails.seed = uuid();
    botttDetails.newSeed = false;
    console.log(botttDetails);
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
            ASSEMBLY LINE {creationPage}
          </h2>
          <div className="interactive-menu">
            <ul className="nav">
              <li className="nav__item">
                <Button
                  text="Level 1"
                  handleInput={() => setCreationPage("levelOne")}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 2"
                  handleInput={() => setCreationPage("levelTwo")}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 3"
                  handleInput={() => setCreationPage("levelThree")}
                />
              </li>
              <li className="nav__item">
                <Button
                  text="Level 4"
                  handleInput={() => setCreationPage("levelFour")}
                />
              </li>
              <li className="nav__item nav__item--seed-tab">
                <Button text="Construct Seed" handleInput={generateSeed} />
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
