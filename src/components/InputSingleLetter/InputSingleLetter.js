import "./InputSingleLetter.scss";

const InputSingleLetter = ({ onChange, name, value, error, gameStart }) => (
  <input
    type="text"
    name={name}
    maxLength={1}
    onChange={onChange}
    className={`input-field ${
      error && value === "" ? "input-field--error" : ""
    } ${gameStart ? "input-field--checked" : ""}`}
  />
);

export default InputSingleLetter;
