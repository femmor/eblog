import { useContext } from "react";
import AnimationWrapper from "./AnimationWrapper";
import { toast } from "react-hot-toast";
import { AppContext } from "../App";
import Tag from "./Tag";

const PublishForm = () => {
  const {
    blog: { banner, title, tags, desc },
    blog,
    setBlog,
    setEditorState,
  } = useContext(AppContext);

  const TAG_LIMIT = 10;

  const handleClose = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({
      ...blog,
      title: input.value,
    });
  };

  const handleBlogDescChange = (e) => {
    const input = e.target;
    setBlog({
      ...blog,
      desc: input.value,
    });
  };

  // Handles desc key down
  const handleDescKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();

      const tag = e.target.value;
      if (tags.length < TAG_LIMIT) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({
            ...blog,
            tags: [...tags, tag],
          });

          e.target.value = "";
        }
      } else {
        return toast.error(`You can only add max ${TAG_LIMIT} tags.`);
      }
    }
  };

  let CHARACTER_LIMIT = 200;
  let CHAR_REMAINING = CHARACTER_LIMIT - desc.length;

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <button
          className="absolute right-[5vw] z-10 top-[5%] w-12 h-12 lg:top-[10%]"
          onClick={handleClose}
        >
          <i className="fi fi-rr-cross text-xl"></i>
        </button>

        <div className="max-w-[500px] center">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="post banner" />
          </div>

          <h1 className="">{title}</h1>

          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {desc}
          </p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            className="input-box pl-4"
            placeholder="Blog Title"
            defaultValue={title}
            onChange={handleBlogTitleChange}
          />
          <p className="text-dark-grey mb-2 mt-9">
            Short description about your post
          </p>
          <textarea
            className="h-40 resize-none leading-7 input-box pl-4"
            maxLength={CHARACTER_LIMIT}
            defaultValue={desc}
            onChange={handleBlogDescChange}
            onKeyDown={handleDescKeyDown}
          ></textarea>

          <p
            className={`mt-1 text-dark-grey text-sm text-right ${
              CHAR_REMAINING === 0 && "text-red"
            }`}
          >
            {CHAR_REMAINING} characters left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            Topics - (Helps in searching and ranking your blog post)
          </p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleTagKeyDown}
            />
            {tags.map((tag, idx) => {
              return <Tag tag={tag} tagIndex={idx} key={idx} />;
            })}
          </div>
          <p className="mt-1 text-dark-grey text-sm text-right">
            {TAG_LIMIT - tags.length} tags left
          </p>
        </div>
      </section>
    </AnimationWrapper>
  );
};
export default PublishForm;
