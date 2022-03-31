import "./LevelOne.scss";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import organizeBots from "../../utils/botSetOrganization";

const LevelOne = ({ levelData, setSelectedChoice, levelsCompleted }) => {
  const [splitArray, setSplitArray] = useState([]);

  useEffect(() => {
    let newArraySet = organizeBots(levelData, 3, 5);
    setSplitArray(newArraySet);
  }, []);

  if (!splitArray.length) return <div>loading...</div>;

  return (
    <section
      className={`level-one ${levelsCompleted >= 1 && "level-one--completed"}`}
    >
      {splitArray.map((botttsSet, i) => (
        <Slider
          key={i}
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
