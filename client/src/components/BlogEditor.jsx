import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimationWrapper from "./AnimationWrapper";
import logo from "../images/logo.png";
import defaultBanner from "../images/blog banner.png";
import uploadImage from "../common/aws";
import { toast } from "react-hot-toast";
import { AppContext } from "../App";
import EditorJS from "@editorjs/editorjs";
import { tools } from "../utils/Tools";

const BlogEditor = () => {
  const {
    blog,
    blog: { title, banner, content, tags, desc },
    setBlog,
    editorState,
    setEditorState,
    textEditor,
    setTextEditor,
  } = useContext(AppContext);

  // UseEffect for text editor
  useEffect(() => {
    // Create the editor
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: "",
        tools: tools,
        placeholder: "Blog post content goes here...",
      })
    );
  }, []);

  // Handles banner upload
  const handleBannerUpload = (e) => {
    let img = e.target.files[0];

    if (img) {
      let loadingToast = toast.loading("Uploading...");
      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("Image uploaded successfully!");
            setBlog({
              ...blog,
              banner: url,
            });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };

  // Handles title key down
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Handles title change
  const handleTitleChange = (e) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({
      ...blog,
      title: input.value,
    });
  };

  const handleImageError = (e) => {
    let img = e.target;
    img.src = defaultBanner;
  };

  const handlePublish = (e) => {
    if (!banner.length) {
      return toast.error("Please upload a post banner.");
    }

    if (!title.length) {
      return toast.error("Please add a post title.");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({
              ...blog,
              content: data,
            });
            setEditorState("publish");
          } else {
            return toast.error("Please add post content to publish it.");
          }
        })
        .catch((err) => toast.error(err));
    }

    // Publish post
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} className="flex-none w-10" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublish}>
            Publish
          </button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner" className="cursor-pointer z-20">
                <img src={banner} onError={handleImageError} />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png,.jpg,.jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
              value={title}
            ></textarea>

            <hr className="w-full my-5 opacity-10" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};
export default BlogEditor;
