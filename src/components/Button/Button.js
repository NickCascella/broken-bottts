import "./Button.scss";

const Button = ({ text, handleInput, additionalClass }) => {
  return (
    <button
      className={`btn ${additionalClass ? additionalClass : ""}`}
      onClick={handleInput}
    >
      {text}
    </button>
  );
};

export default Button;
