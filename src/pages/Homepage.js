import "./Homepage.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import InputSingleLetter from "../components/InputSingleLetter/InputSingleLetter";

const Homepage = ({ username, setUserName }) => {
  const [userCharOne, setUserCharOne] = useState("");
  const [userCharTwo, setUserCharTwo] = useState("");
  const [userCharThree, setUserCharThree] = useState("");

  let history = useHistory();

  const handleInput = (e) => {
    const input = e.target;
    switch (input.name) {
      case "firstLetter":
        setUserCharOne(input.value);
        break;
      case "secondLetter":
        setUserCharTwo(input.value);
        break;
      case "thirdLetter":
        setUserCharThree(input.value);
        break;
    }
  };

  const startGame = (e) => {
    e.preventDefault();
    if (userCharOne && userCharTwo && userCharThree) {
      let fullName = `${userCharOne}${userCharTwo}${userCharThree}`;
      setUserName(fullName);
      history.push("/game");
    }
  };

  return (
    <div className="home-screen-wrapper">
      <section className="home-screen">
        <h1 className="home-screen__title">Broken Bottts</h1>
        <p className="home-screen__welcome-message">
          Welcome to Broken Bottts! You have been tasked with finding and
          removing the robots we have discovered to have been infected with a
          malicious yet inefficent virus...android operating software. You have
          been tasked to remove these robots from our operation as quickly as
          possible. If you can complete this in an adequte amount of time we
          will offer you a promotion from your position as intern to senior
          intern. Don't mess this up.
        </p>
        <form className="home-screen__form">
          <h2>Enter your credentials please.</h2>
          <div>
            <InputSingleLetter onChange={handleInput} name={"firstLetter"} />
            <InputSingleLetter onChange={handleInput} name={"secondLetter"} />
            <InputSingleLetter onChange={handleInput} name={"thirdLetter"} />
          </div>
          <button className="home-screen__proceed-button" onClick={startGame}>
            Proceed
          </button>
        </form>
      </section>
    </div>
  );
};

export default Homepage;
