import { AnimationWrapper, InPageNavigation } from "../components";

const Home = () => {
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
            <h1>Latest Posts</h1>
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
