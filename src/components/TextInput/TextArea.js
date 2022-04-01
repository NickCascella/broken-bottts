import "./TextArea.scss";

const TextArea = ({ handleInput, value }) => {
  return (
    <textarea
      className="text-area"
      onChange={handleInput}
      value={value}
    ></textarea>
  );
};

export default TextArea;
