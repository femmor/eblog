import { useContext } from "react";
import AnimationWrapper from "./AnimationWrapper";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigation = () => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
    navigate("/signin");
  };

  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200">
        <Link
          to="editor"
          className="flex items-center gap-2 link md:hidden pl-8 py-4"
        >
          <i className="fi fi-rr-file-edit text-xl"></i>
          <p>Write</p>
        </Link>
        <Link
          to={`/user/${username}`}
          className="flex items-center gap-2 link md:hidden pl-8 py-4"
        >
          <i className="fi fi-rr-user text-xl"></i>
          <p>Profile</p>
        </Link>
        <Link
          to={`/dashboard`}
          className="flex items-center gap-2 link md:hidden pl-8 py-4"
        >
          <i className="fi fi-rr-dashboard text-xl"></i>
          <p>Dashboard</p>
        </Link>
        <Link
          to={`/settings/edit-profile`}
          className="flex items-center gap-2 link md:hidden pl-8 py-4"
        >
          <i className="fi fi-rr-settings text-xl"></i>
          <p>Settings</p>
        </Link>

        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};
export default UserNavigation;
