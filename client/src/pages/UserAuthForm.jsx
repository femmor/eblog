import { Link } from "react-router-dom";
import { AnimationWrapper, Input } from "../components";
import googleIcon from "../images/google.png";
import { useRef } from "react";
import { toast } from "react-hot-toast";

const UserAuthForm = ({ type }) => {
  const authFormRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get formData
    let form = new FormData(authFormRef.current);
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

    console.log(formData);
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form ref={authFormRef} className="w-[80%] max-w-[400px]">
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
          <button className="btn-dark center flex gap-4 w-[90%] justify-center items-center">
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
