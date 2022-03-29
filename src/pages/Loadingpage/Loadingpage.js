import { useEffect, useState } from "react";
import "./Loadingpage.scss";

const Loadingpage = ({ page }) => {
  const [completeLoading, setCompleteLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCompleteLoading(true);
    }, 4500);
  }, []);

  return (
    <div
      className={`loading-page ${page === "game" && "loading-page--load-out"}`}
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
          {page === "game" && completeLoading && (
            <h1 className="loading-page__title loading-page__title--line-two">
              Ram removed.......initializing game.
            </h1>
          )}

          <div className="loading-bar">
            <div
              className={`loading-bar__track ${
                page === "home" && "loading-bar__track--load-in"
              } ${page === "game" && "loading-bar__track--load-out-end"} `}
            ></div>
          </div>
        </div>
        <div className="modal-background"></div>
      </div>
    </div>
  );
};

export default Loadingpage;
