import { useEffect, useState } from "react";
import "./Loadingpage.scss";

const Loadingpage = ({ page, playerRecord, highscores }) => {
  const [completeLoading, setCompleteLoading] = useState(0);
  const [inTopFive, setInTop5] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCompleteLoading(1);
    }, 4500);
    if (page !== "home") {
      setTimeout(() => {
        setCompleteLoading(2);
      }, 9000);
      setTimeout(() => {
        setCompleteLoading(3);
      }, 13500);
    }

    if (highscores) {
      if (playerRecord.newSeed) {
        let checkInTopFive = highscores.randomRuns.some((run) => {
          return playerRecord.time < run.time;
        });

        return checkInTopFive
          ? setInTop5({ record: true, randomRun: true })
          : setInTop5({ record: false, randomRun: true });
      } else {
        let checkInTopFive = highscores.seededRuns.some(
          (run) => playerRecord.time < run.time
        );
        return checkInTopFive
          ? setInTop5({ record: true, randomRun: false })
          : setInTop5({ record: false, randomRun: false });
      }
    }
  }, []);

  return (
    <div
      className={`loading-page ${page === "game" && "loading-page--load-out"} ${
        page === "end-game" && "loading-page--end-game"
      }`}
    >
      <div className="modal-wrapper">
        <div className="loading-page__modal">
          {page === "home" && (
            <h1 className="loading-page__title">
              Phishing all your passwords....
            </h1>
          )}

          {page === "game" && !completeLoading && (
            <h1 className="loading-page__title loading-page__title--no-delay loading-page__title--no-delay--end-text">
              Uninstalling all your ram....
            </h1>
          )}
          {page === "game" && completeLoading === 1 && (
            <h1 className="loading-page__title loading-page__title--line-two">
              Ram removed.......initializing game.
            </h1>
          )}
          {page === "end-game" && !completeLoading && (
            <h1 className="loading-page__title loading-page__title--no-delay loading-page__title--end-text">
              You're finally done. About time...
            </h1>
          )}
          {page === "end-game" && completeLoading === 1 && (
            <h1 className="loading-page__title loading-page__title--no-delay loading-page__title--end-text">
              Lets see how you did...
            </h1>
          )}
          {page === "end-game" && completeLoading === 2 && (
            <h1 className="loading-page__title loading-page__title--no-delay loading-page__title--end-text">
              {inTopFive.record &&
                inTopFive.randomRun &&
                "Ooooh top 5 for a randomized run :o"}
              {inTopFive.record &&
                !inTopFive.randomRun &&
                "Ooooh top 5 for a seeded run :o"}
              {!inTopFive.record && "...I mean it could've been worse..."}
            </h1>
          )}
          {page === "end-game" && completeLoading === 3 && (
            <h1 className="loading-page__title loading-page__title--no-delay loading-page__title--end-text">
              {inTopFive.record && "Nice job...for a human. See ya!"}
              {!inTopFive.record && "Alright, we're done here. See ya!"}
            </h1>
          )}
          <div className="loading-bar">
            <div
              className={`loading-bar__track ${
                page === "home" && "loading-bar__track--load-in"
              } ${page === "game" && "loading-bar__track--load-out-end"} ${
                page === "end-game" && "loading-bar__track--end-game"
              }`}
            ></div>
          </div>
        </div>
        <div className="modal-background"></div>
      </div>
    </div>
  );
};

export default Loadingpage;
