import axios from "axios";
import { AnimationWrapper, InPageNavigation, Loader } from "../components";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState(null);

  const fetchLatestPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/posts/latest-posts`
      );
      const { blogs } = response.data;
      setBlogs(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* Latest posts */}
        <div className="w-full">
          <InPageNavigation
            routes={["home", "trending posts"]}
            defaultHidden={["trending posts"]}
            defaultActiveIndex={0}
          >
            <>
              {blogs === null ? (
                <Loader />
              ) : (
                blogs.map((blog, idx) => {
                  const { title } = blog;
                  return <h1 key={idx}>{title}</h1>;
                })
              )}
            </>
            <h1>Trending Posts</h1>
          </InPageNavigation>
        </div>
        {/* Filters and Trending posts */}
        <div className=""></div>
      </section>
    </AnimationWrapper>
  );
};
export default Home;
