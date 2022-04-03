import "./TextInput.scss";

const TextInput = ({
  id,
  additionalClassNames,
  value,
  handleInput,
  maxLength,
}) => (
  <input
    id={id}
    className={`text-input ${additionalClassNames}`}
    type="text"
    value={value}
    onChange={handleInput}
    maxLength={maxLength}
  ></input>
);

export default TextInput;
