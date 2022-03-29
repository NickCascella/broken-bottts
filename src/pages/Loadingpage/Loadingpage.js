import "./Loadingpage.scss";

const Loadingpage = ({ page }) => {
  return (
    <div
      className={`loading-page ${page === "game" && "loading-page--load-out"}`}
    >
      <div className="modal-wrapper">
        <div className="loading-page__modal">
          {page === "home" && (
            <h1 className="loading-page__title">
              Looking for alternative games....
            </h1>
          )}

          {page === "game" && (
            <h1 className="loading-page__title loading-page__title--no-delay">
              Downloading additional ram....
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
