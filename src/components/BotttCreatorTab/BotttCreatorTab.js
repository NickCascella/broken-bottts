import "./BotttCreatorTab.scss";
import forgeGif from "../../assets/images/forge.gif";
import { useState } from "react";
import LevelStyler from "../LevelStyler/LevelStyler";

const BotttCreator = ({ chevronImg, transitionPage }) => {
  const [creationPage, setCreationPage] = useState("levelOne");

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
          <h2 className="bottt-creator-screen__title">THE FORGE</h2>
          <div className="interactive-menu">
            <ul className="nav">
              <li
                className="nav__item"
                onClick={() => setCreationPage("levelOne")}
              >
                Level 1
              </li>
              <li
                className="nav__item"
                onClick={() => setCreationPage("levelTwo")}
              >
                Level 2
              </li>
              <li
                className="nav__item"
                onClick={() => setCreationPage("levelThree")}
              >
                Level 3
              </li>
              <li
                className="nav__item"
                onClick={() => setCreationPage("levelFour")}
              >
                Level 4
              </li>
              <li
                className="nav__item nav__item--seed-tab"
                onClick={() => setCreationPage("displaySeed")}
              >
                Generate Seed
              </li>
            </ul>
            <div className="interactive-menu__current-page">
              <LevelStyler />
            </div>
          </div>
        </section>
        <img
          className="menu-background menu-background--colour-two"
          src={forgeGif}
          alt="factorio gif"
        />
      </div>
    </div>
  );
};

export default BotttCreator;
