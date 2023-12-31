import { Link, Navigate } from "react-router-dom";
import { AnimationWrapper, Input } from "../components";
import googleIcon from "../images/google.png";
import { toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { useContext } from "react";
import { AppContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(AppContext);

  // Submits user info to the server or authentication
  const submitUserAuthToServer = async (serverRoute, formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/auth/${serverRoute}`,
        formData
      );
      const { data } = response;
      storeInSession("user", JSON.stringify(data));
      setUserAuth(data);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // Handles user authentication submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign in" ? "signin" : "signup";

    // Get formData
    let form = new FormData(authForm);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    // Form validation
    const { fullName, email, password } = formData;

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (fullName) {
      if (fullName.length < 3) {
        return toast.error("Full name must be at least 3 characters long");
      }
    }

    if (!email.length) {
      return toast.error("Please enter an email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!passwordRegex?.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter"
      );
    }

    submitUserAuthToServer(serverRoute, formData);
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    await authWithGoogle()
      .then((user) => {
        let serverRoute = "google-auth";

        let formData = {
          access_token: user.accessToken,
        };

        submitUserAuthToServer(serverRoute, formData);
      })
      .catch((err) => {
        toast.error("Trouble signing in with google.");
        return console.log(err);
      });
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form id="authForm" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign in" ? "welcome back" : "join us today"}
          </h1>
          {type === "sign up" && (
            <Input
              type="text"
              icon="user"
              name="fullName"
              placeholder="Enter full name"
            />
          )}
          <Input
            type="email"
            icon="envelope"
            name="email"
            placeholder="Enter email address"
          />
          <Input
            type="password"
            icon="key"
            name="password"
            placeholder="Enter password"
          />
          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleSubmit}
          >
            {type}
          </button>
          <div className="relative w-full gap-2 flex items-center my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            className="btn-dark center flex gap-4 w-[90%] justify-center items-center"
            onClick={handleGoogleAuth}
          >
            <img src={googleIcon} alt="Google icon" className="w-4" />
            {type} with google
          </button>

          {type === "sign in" ? (
            <p className="text-dark-grey my-2 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-purple">
                Create an account
              </Link>
            </p>
          ) : (
            <p className="text-dark-grey my-2 text-center">
              Already have an account?{" "}
              <Link to="/signin" className="font-semibold text-purple">
                Sign In
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};
export default UserAuthForm;
