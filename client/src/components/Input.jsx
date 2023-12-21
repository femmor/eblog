import { useState } from "react";

const Input = ({ type, name, id, icon, value, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-[100%] mb-4">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        name={name}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
        className="input-box"
      />
      <i className={`fi fi-rr-${icon} input-icon`}></i>
      {type === "password" && (
        <i
          className={`fi fi-rr-${
            showPassword ? "eye" : "eye-crossed"
          } input-icon left-[auto] right-4 cursor-pointer`}
          onClick={handleShowPassword}
        ></i>
      )}
    </div>
  );
};
export default Input;
