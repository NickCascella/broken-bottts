import "./AllSeedsTab.scss";
import storeImg from "../../assets/images/store.gif";
import { useEffect, useState } from "react";
import requests from "../../utils/requests";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import reactStringReplace from "react-string-replace";

const AllSeedsTab = ({ chevronImg, transitionPage, currentView, newSeed }) => {
  const [seedData, setSeedData] = useState(null);
  const [seedDataCopy, setSeedDataCopy] = useState(null);
  const [segmentedData, setSegmentedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(5);
  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(() => {
    const getAllSeeds = async () => {
      try {
        setCurrentSearch("");
        const seeds = await requests.getSeedsData();

        setSeedData(seeds);
        setSeedDataCopy(seeds);
        setSegmentedData(seeds.slice(0, 5));
        setCurrentPage(5);
      } catch (err) {
        console.log(err);
      }
    };
    getAllSeeds();
  }, [newSeed]);

  useEffect(() => {
    if (seedData) {
      setSegmentedData(seedData.slice(0, 5));
    }
  }, [seedData]);

  const filterList = (e) => {
    setCurrentSearch(e.target.value);

    const filteredList = seedDataCopy.filter((item) => {
      return (
        item.seed.toLowerCase().includes(e.target.value.toLowerCase()) ||
        (item.description
          ? item.description
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          : null)
      );
    });
    setSeedData(filteredList);
  };

  const highlightResults = (str) => {
    if (!str) {
      return;
    }
    if (
      !currentSearch ||
      str.toLowerCase().indexOf(currentSearch.toLowerCase()) === -1
    ) {
      return str;
    }

    return reactStringReplace(str, currentSearch, (match) => (
      <span className="all-seeds-screen__table-item--highlighted">{match}</span>
    ));
  };

  return (
    <section
      className={`all-seeds-records-wrapper ${
        currentView === "all-seeds"
          ? "all-seeds-records-wrapper--shift-down"
          : ""
      } ${
        currentView === "north-to-main"
          ? "all-seeds-records-wrapper--shift-up"
          : ""
      }`}
    >
      <img
        alt="chevron"
        src={chevronImg}
        className="chevron chevron--south chevron--mouse-leave"
        onMouseOver={() => {
          setTimeout(() => {
            transitionPage("north-to-main");
          }, 200);
        }}
      />
      <div className="background-img-container">
        <div className="all-seeds-screen">
          <h1>Seed Vault</h1>
          <TextInput value={currentSearch} handleInput={filterList} />
          <div className="all-seeds-screen__table">
            <div className="all-seeds-screen__table-row">
              <div className="all-seeds-screen__table-item all-seeds-screen__table-item--header">
                Seed
              </div>
              <div className="all-seeds-screen__table-item all-seeds-screen__table-item--header">
                Description
              </div>
            </div>
            {segmentedData &&
              segmentedData.map((level) => {
                return (
                  <div
                    key={level.seed}
                    className="all-seeds-screen__table-row all-seeds-screen__table-row--non-header"
                  >
                    <div className="all-seeds-screen__table-item ">
                      {highlightResults(level.seed)}
                    </div>
                    <div className="all-seeds-screen__table-item all-seeds-screen__table-item--description">
                      {highlightResults(level.description)}
                    </div>
                  </div>
                );
              })}
            {segmentedData && !segmentedData.length && (
              <h2 className="all-seeds-screen__no-results-title">
                No results found.
              </h2>
            )}
            {!segmentedData && (
              <h2 className="all-seeds-screen__no-results-title">
                No seeds in existence.
              </h2>
            )}
          </div>
          <div className="all-seeds-screen__btn-nav">
            <Button
              additionalClass={
                "all-seeds-screen__next-page-btn all-seeds-screen__next-page-btn--flipped"
              }
              handleInput={() => {
                if (currentPage - 5 !== 0) {
                  setCurrentPage(currentPage - 5);
                  setSegmentedData(
                    seedData.slice(currentPage - 10, currentPage - 5)
                  );
                }
              }}
            />
            {seedData && (
              <div>
                {Math.ceil(
                  Math.min(
                    currentPage / 5,
                    (seedData.length ? seedData.length : 5) / 5
                  )
                )}{" "}
                / {Math.ceil((seedData.length ? seedData.length : 5) / 5)}
              </div>
            )}
            <Button
              additionalClass={"all-seeds-screen__next-page-btn"}
              handleInput={() => {
                if (currentPage < seedData.length) {
                  setSegmentedData(
                    seedData.slice(currentPage, currentPage + 5)
                  );
                  setCurrentPage(currentPage + 5);
                }
              }}
            />
          </div>
        </div>
        <img
          className="menu-background menu-background--colour-three"
          src={storeImg}
          alt="circuits gif"
        />
      </div>
    </section>
  );
};

export default AllSeedsTab;
