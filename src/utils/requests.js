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
};

export default requests;
