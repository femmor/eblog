import { nanoid } from "nanoid";
import User from "../Schema/User.js";

// Create a unique username
export const generateUsername = async (email) => {
  let username = email.split("@")[0];

  let isUsernameNotUnique = await User.exists({
    "personalInfo.username": username,
  }).then((result) => {
    return result;
  });

  isUsernameNotUnique ? (username += nanoid(4)) : "";

  return username;
};

export const formatDataToSend = (user) => {
  return {
    profileImg: user.personalInfo.profileImg,
    username: user.personalInfo.username,
    fullName: user.personalInfo.fullName,
  };
};
