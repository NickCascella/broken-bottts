import "./InputSingleLetter.scss";

const InputSingleLetter = ({ onChange, name }) => (
  <input
    type="text"
    name={name}
    maxLength={1}
    onChange={onChange}
    className="input-field"
  />
);

export default InputSingleLetter;
