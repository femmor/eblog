import { useEffect, useRef, useState } from "react";

const InPageNavigation = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children,
}) => {
  const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);

  const activeTabLineRef = useRef(null);
  const activeTabRef = useRef(null);

  const changePageState = (btn, idx) => {
    setInPageNavIndex(idx);
    let { offsetWidth, offsetLeft } = btn;

    activeTabLineRef.current.style.width = `${offsetWidth}px`;
    activeTabLineRef.current.style.left = `${offsetLeft}px`;
  };

  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex);
  }, []);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, idx) => {
          return (
            <button
              ref={idx === defaultActiveIndex ? activeTabRef : null}
              key={idx}
              className={`p-4 px-5 capitalize ${
                inPageNavIndex === idx ? "text-black" : "text-dark-grey"
              } ${
                defaultHidden && defaultHidden.includes(route)
                  ? "md:hidden"
                  : ""
              }`}
              onClick={(e) => changePageState(e.target, idx)}
            >
              {route}
            </button>
          );
        })}

        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>
      {Array.isArray(children) && children[inPageNavIndex]}
    </>
  );
};
export default InPageNavigation;
