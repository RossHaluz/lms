import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const EdditDescription = ({ value, onChange }) => {
  return <ReactQuill value={value} onChange={onChange} />;
};
