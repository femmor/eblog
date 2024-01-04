import { useContext } from "react";
import { AppContext } from "../App";

const Tag = ({ tag, tagIndex }) => {
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

  const handleTagEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();

      let currentTag = e.target.innerText;
      tags[tagIndex] = currentTag;

      setBlog({
        ...blog,
        tags,
      });

      e.target.setAttribute("contentEditable", false);
    }
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
      <p
        className="outline-none"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onKeyDown={handleTagEdit}
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
