import { useEffect, useState } from "react";
import "./Loadingpage.scss";
import formatTime from "../../utils/formatTime";

const Loadingpage = ({ page, time }) => {
  const [completeLoading, setCompleteLoading] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCompleteLoading(1);
    }, 4500);
    setTimeout(() => {
      setCompleteLoading(2);
    }, 9000);
    setTimeout(() => {
      setCompleteLoading(3);
    }, 13500);
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
            <h1 className="loading-page__title loading-page__title--no-delay">
              Uninstalling all your ram....
            </h1>
          )}
          {page === "game" && completeLoading === 1 && (
            <h1 className="loading-page__title loading-page__title--line-two">
              Ram removed.......initializing game.
            </h1>
          )}
          {page === "end-game" && !completeLoading && (
            <h1 className="loading-page__title loading-page__title--no-delay">
              You're finally done. About time...
            </h1>
          )}
          {page === "end-game" && completeLoading === 1 && (
            <h1 className="loading-page__title loading-page__title--no-delay">
              Lets see how you did...
            </h1>
          )}
          {page === "end-game" && completeLoading === 2 && (
            <h1 className="loading-page__title loading-page__title--no-delay">
              Wow look at you: {formatTime(time)}
            </h1>
          )}
          {page === "end-game" && completeLoading === 3 && (
            <h1 className="loading-page__title loading-page__title--no-delay">
              Let's compare you to everyone. :)
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
