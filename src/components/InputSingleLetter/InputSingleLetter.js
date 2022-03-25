import "./InputSingleLetter.scss";

const InputSingleLetter = ({ onChange, name, value, error }) => (
  <input
    type="text"
    name={name}
    maxLength={1}
    onChange={onChange}
    className={`input-field ${
      error && value === "" ? "input-field--error" : ""
    }`}
  />
);

export default InputSingleLetter;
