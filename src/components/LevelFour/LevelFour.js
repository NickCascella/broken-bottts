import "./LevelFour.scss";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import organizeBots from "../../utils/botSetOrganization";

const LevelFour = ({ levelData, setSelectedChoice, levelsCompleted }) => {
  const [splitArray, setSplitArray] = useState([]);

  useEffect(() => {
    let newArraySet = organizeBots(levelData, 8, 5);
    setSplitArray(newArraySet);
  }, []);

  if (!splitArray.length) return <div>loading...</div>;

  return (
    <section
      className={`level-four ${
        levelsCompleted === 3 && "level-four--starting"
      } ${levelsCompleted === 4 && "level-four--completed"}`}
    >
      {splitArray.map((botttsSet, i) => (
        <Slider
          key={i}
          sliderClass={"level-four__slider"}
          trackClass={`level-four__slide-track ${
            i % 2 === 0 && "level-four__slide-track--left"
          }`}
          slideClass={"level-four__slide"}
          imgClass={"level-four__img"}
          setSelectedChoice={setSelectedChoice}
          displayedImgs={botttsSet}
        />
      ))}
    </section>
  );
};

export default LevelFour;
