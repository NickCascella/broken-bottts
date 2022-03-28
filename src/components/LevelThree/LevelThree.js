import "./LevelThree.scss";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import organizeBots from "../../utils/botSetOrganization";

const LevelThree = ({
  levelData,
  setSelectedChoice,
  levelsCompleted,
  previousComplete,
}) => {
  const [splitArray, setSplitArray] = useState([]);

  useEffect(() => {
    let newArraySet = organizeBots(levelData, 7, 6);
    setSplitArray(newArraySet);
  }, []);

  if (!splitArray.length) return <div>loading...</div>;

  return (
    <section
      className={`level-three ${
        levelsCompleted === 2 && "level-three--starting"
      } ${levelsCompleted === 3 && "level-three--completed"} ${
        previousComplete && "level-three--prev-completed"
      }`}
    >
      {splitArray.map((botttsSet, i) => (
        <Slider
          sliderClass={"level-three__slider"}
          trackClass={`level-three__slide-track ${
            i % 2 === 0 && "level-three__slide-track--left"
          }`}
          slideClass={"level-three__slide"}
          imgClass={"level-three__img"}
          setSelectedChoice={setSelectedChoice}
          displayedImgs={botttsSet}
        />
      ))}
    </section>
  );
};

export default LevelThree;
