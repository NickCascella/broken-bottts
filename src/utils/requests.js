import axios from "axios";

const requests = {
  botttStyles: async () => {
    try {
      const botttStylesData = await axios.get(
        `${process.env.REACT_APP_URL}/bottts/styles`
      );
      return botttStylesData.data.results[0];
    } catch (err) {
      return err;
    }
  },
  postHighscore: async (data) => {
    try {
      const confirmPost = await axios.post(
        `${process.env.REACT_APP_URL}/highscores`,
        data
      );
      return confirmPost;
    } catch (err) {
      return err;
    }
  },
  getHighscores: async () => {
    try {
      const highscores = await axios.get(
        `${process.env.REACT_APP_URL}/highscores`
      );
      return highscores.data.sortedScores;
    } catch (err) {
      return err;
    }
  },
  postSeedData: async (levelData) => {
    const sortedLevelData = {
      seed: levelData.seed,
      levelOne: {
        targetBotttObjInfo: levelData.levelOne.targetBotttObjInfo,
        allBotttsObjInfo: levelData.levelOne.allBotttsObjInfo,
      },
      levelTwo: {
        targetBotttObjInfo: levelData.levelTwo.targetBotttObjInfo,
        allBotttsObjInfo: levelData.levelTwo.allBotttsObjInfo,
      },
      levelThree: {
        targetBotttObjInfo: levelData.levelThree.targetBotttObjInfo,
        allBotttsObjInfo: levelData.levelThree.allBotttsObjInfo,
      },
      levelFour: {
        targetBotttObjInfo: levelData.levelFour.targetBotttObjInfo,
        allBotttsObjInfo: levelData.levelFour.allBotttsObjInfo,
      },
    };

    try {
      const seedData = await axios.post(
        `${process.env.REACT_APP_URL}/bottts/seeds`,
        sortedLevelData
      );
      return seedData.data;
    } catch (err) {
      return err;
    }
  },
  getSeedData: async (seedId) => {
    try {
      const seedData = await axios.get(
        `${process.env.REACT_APP_URL}/bottts/seeds/${seedId}`
      );
      return seedData.data.results[0];
    } catch (err) {
      return err;
    }
  },
};

export default requests;
