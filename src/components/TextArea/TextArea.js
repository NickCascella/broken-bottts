import "./TextArea.scss";

const TextArea = ({
  handleInput,
  value,
  additionalClasses,
  placeHolder,
  maxLength,
}) => {
  return (
    <textarea
      className={`text-area ${additionalClasses}`}
      onChange={handleInput}
      value={value}
      placeholder={placeHolder}
      maxLength={maxLength}
    ></textarea>
  );
};

export default TextArea;
