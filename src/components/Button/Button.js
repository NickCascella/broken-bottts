import "./Button.scss";

const Button = ({ text, handleInput }) => {
  return (
    <button className="btn" onClick={handleInput}>
      {text}
    </button>
  );
};

export default Button;
