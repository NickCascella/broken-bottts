import axios from "axios";

const requests = {
  botttStyles: async () => {
    try {
      const botttStylesData = await axios.get(
        `${process.env.REACT_APP_URL}/bottts/styles`
      );
      return botttStylesData.data.results[0];
    } catch (err) {
      return err.response.data;
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
      return err.response.data;
    }
  },
  getHighscores: async () => {
    try {
      const highscores = await axios.get(
        `${process.env.REACT_APP_URL}/highscores`
      );
      return highscores.data.sortedScores;
    } catch (err) {
      return err.response.data;
    }
  },
  postSeedData: async (levelData) => {
    const sortedLevelData = {
      seed: levelData.seed,
      description: levelData.description,
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
      newSeed: levelData.newSeed,
    };

    try {
      const seedData = await axios.post(
        `${process.env.REACT_APP_URL}/bottts/seeds`,
        sortedLevelData
      );
      return seedData.data;
    } catch (err) {
      return err.response.data;
    }
  },
  getSeedData: async (seedId) => {
    try {
      const seedData = await axios.get(
        `${process.env.REACT_APP_URL}/bottts/seeds/${
          seedId ? seedId : "invalid-seed"
        }`
      );

      return seedData.data.results[0];
    } catch (err) {
      return err.response.data;
    }
  },
  getSeedsData: async () => {
    try {
      const seedData = await axios.get(
        `${process.env.REACT_APP_URL}/bottts/seeds`
      );
      return seedData.data.filteredResults;
    } catch (err) {
      return err.response.data;
    }
  },
  validateUsername: async (username) => {
    try {
      const highscoreUsers = await axios.get(
        `${process.env.REACT_APP_URL}/highscores/users/${username}`
      );
      return highscoreUsers.data.results;
    } catch (err) {
      return err.response.data;
    }
  },
};

export default requests;
