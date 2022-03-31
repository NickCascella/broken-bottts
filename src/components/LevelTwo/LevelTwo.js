import "./LevelTwo.scss";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import organizeBots from "../../utils/botSetOrganization";

const LevelTwo = ({
  levelData,
  setSelectedChoice,
  levelsCompleted,
  previousComplete,
}) => {
  const [splitArray, setSplitArray] = useState([]);

  useEffect(() => {
    let newArraySet = organizeBots(levelData, 5, 5);
    setSplitArray(newArraySet);
  }, []);

  if (!splitArray.length) return <div>loading...</div>;

  return (
    <section
      className={`level-two ${levelsCompleted === 1 && "level-two--starting"} ${
        levelsCompleted >= 2 && "level-two--completed"
      } 
      
      `}
      // ${previousComplete && "level-two--prev-completed"}
    >
      {splitArray.map((botttsSet, i) => (
        <Slider
          key={i}
          sliderClass={"level-two__slider"}
          trackClass={"level-two__slide-track"}
          slideClass={"level-two__slide"}
          imgClass={"level-two__img"}
          setSelectedChoice={setSelectedChoice}
          displayedImgs={botttsSet}
        />
      ))}
    </section>
  );
};

export default LevelTwo;
