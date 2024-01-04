import { useContext } from "react";
import { AppContext } from "../App";

const Tag = ({ tag }) => {
  const {
    blog,
    blog: { tags },
    setBlog,
  } = useContext(AppContext);

  const handleDeleteTag = () => {
    const newTags = tags.filter((t) => t !== tag);
    setBlog({
      ...blog,
      tags: newTags,
    });
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
      <p
        className="outline-none"
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {tag}
      </p>
      <button
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
        onClick={handleDeleteTag}
      >
        <i className="fi fi-br-cross text-xs pointer-events-none"></i>
      </button>
    </div>
  );
};
export default Tag;
