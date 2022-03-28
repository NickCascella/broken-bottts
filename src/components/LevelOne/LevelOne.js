import "./LevelOne.scss";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import organizeBots from "../../utils/botSetOrganization";

const LevelOne = ({
  levelData,
  setSelectedChoice,
  levelsCompleted,
  completed,
}) => {
  const [splitArray, setSplitArray] = useState([]);

  useEffect(() => {
    let newArraySet = organizeBots(levelData, 3, 5);
    setSplitArray(newArraySet);
  }, []);

  if (!splitArray.length) return <div>loading...</div>;

  return (
    <section
      className={`level-one ${
        levelsCompleted === 1 && "level-one--completed"
      } ${completed && "level-one--fix"}`}
    >
      {splitArray.map((botttsSet) => (
        <Slider
          sliderClass={"level-one__slider"}
          trackClass={"level-one__slide-track"}
          slideClass={"level-one__slide"}
          imgClass={"level-one__img"}
          setSelectedChoice={setSelectedChoice}
          displayedImgs={botttsSet}
        />
      ))}
    </section>
  );
};

export default LevelOne;
