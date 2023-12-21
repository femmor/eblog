import { Link } from "react-router-dom";
import { Input } from "../components";
import googleIcon from "../images/google.png";

const UserAuthForm = ({ type }) => {
  return (
    <section className="h-cover flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
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
        <button className="btn-dark center mt-14" type="submit">
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
  );
};
export default UserAuthForm;
