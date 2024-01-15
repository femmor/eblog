import { Link } from "react-router-dom";
import formatDate from "../common/date";

const BlogPost = ({ content, author }) => {
  const {
    title,
    blogId: id,
    publishedAt,
    tags,
    desc,
    banner,
    activity: { total_likes },
  } = content;
  const { fullName, username, profileImg } = author;
  return (
    <div className="flex justify-between gap-8 items-center border-b border-grey pb-5 mb-4">
      <div className="w-full">
        <Link to={`/blogs/${id}`}>
          <h1 className="blog-title">{title}</h1>
        </Link>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {desc}
        </p>

        <div className="my-2 flex gap-4 mt-7">
          {tags.map((tag, idx) => (
            <span key={idx} className="btn-dark py-1 px-4 mx-1 text-sm">
              {tag}
            </span>
          ))}
          <span className="ml-3 flex items-center gap-2 text-dark cursor-pointer">
            <i className="fi fi-rr-heart text-xl"></i> {total_likes}
          </span>
        </div>

        <div className="flex gap-2 items-center mb-2">
          Posted by:
          <img
            src={profileImg}
            alt="profile image"
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">
            {fullName} @{username}
          </p>
          {" - "}
          <p className="min-w-fit">{formatDate(publishedAt)}</p>
        </div>
      </div>
      <div className="h-28 aspect-square bg-grey">
        <img
          src={banner}
          alt="blog banner"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};
export default BlogPost;
