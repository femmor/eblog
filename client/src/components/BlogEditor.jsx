import { useRef } from "react";
import { Link } from "react-router-dom";
import AnimationWrapper from "./AnimationWrapper";
import logo from "../images/logo.png";
import defaultBanner from "../images/blog banner.png";
import uploadImage from "../common/aws";
import { toast } from "react-hot-toast";

const BlogEditor = () => {
  let blogBannerRef = useRef();

  const handleBannerUpload = (e) => {
    let img = e.target.files[0];

    if (img) {
      let loadingToast = toast.loading("Uploading...");
      uploadImage(img)
        .then((url) => {
          if (url) {
            blogBannerRef.current.src = url;
            toast.dismiss(loadingToast);
            toast.success("Image uploaded successfully!");
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} className="flex-none w-10" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner" className="cursor-pointer z-20">
                <img ref={blogBannerRef} src={defaultBanner} />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png,.jpg,.jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};
export default BlogEditor;
