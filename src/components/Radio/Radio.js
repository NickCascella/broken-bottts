import "./Radio.scss";

const RadioInput = ({ name, id, value, handleInput, defaultChecked }) => {
  return (
    <input
      type="radio"
      name={name}
      id={id}
      value={value}
      onChange={handleInput}
      className="radio-input"
      defaultChecked={defaultChecked}
    />
  );
};

export default RadioInput;
