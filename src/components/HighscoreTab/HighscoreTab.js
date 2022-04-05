import "./HighscoreTab.scss";
import HighscoreTable from "../HighscoreTable/HighscoreTable";
import circuitsImg from "../../assets/images/circuits.gif";
import Button from "../Button/Button";

const HighscoreTab = ({
  setCurrentView,
  chevronImg,
  transitionPage,
  highscores,
  newRecord,
}) => {
  return (
    <div className="highscores-tab-wrapper">
      <img
        alt="chevron"
        src={chevronImg}
        className="chevron chevron--flipped"
        onMouseOver={() => {
          setTimeout(() => {
            transitionPage("highscores-to-main");
          }, 200);
        }}
      />
      <div className="highscores-tab__wrap">
        <div className="background-img-container">
          <section className="highscore-screen">
            <h2 className="highscore-screen__title">
              TOP 5 ORIGINAL HIGHSCORES
            </h2>
            {highscores && (
              <HighscoreTable
                list={highscores.randomRuns}
                newRecord={newRecord}
              />
            )}
            <h2 className="highscore-screen__title--not-first">
              TOP 5 CUSTOM/REPEAT HIGHSCORES
            </h2>
            {highscores && (
              <HighscoreTable
                list={highscores.seededRuns}
                newRecord={newRecord}
              />
            )}
            <Button
              handleInput={() => setCurrentView("highscores-to-main")}
              text="Home"
            />
          </section>
          <img
            className="menu-background menu-background--colour-one"
            src={circuitsImg}
            alt="circuits gif"
          />
        </div>
      </div>
    </div>
  );
};

export default HighscoreTab;
