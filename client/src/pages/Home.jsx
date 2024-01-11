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
          ></InPageNavigation>
        </div>
        {/* Filters and Trending posts */}
        <div className=""></div>
      </section>
    </AnimationWrapper>
  );
};
export default Home;
