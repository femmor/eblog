import bcrypt from "bcrypt";
import User from "../../Schema/User.js";
import { generateUsername, formatDataToSend } from "../../helpers/utils.js";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Validates email to include @ symbol and a valid domain
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // Validates password with 6 - 20 characters, 1 uppercase letter and 1 lowercase letter

/* 
    @title Sign Up
    @route POST /api/auth/signup
    @desc Sign up user
    @access Public
*/
const signUp = (req, res) => {
  const { fullName, email, password } = req.body;

  // Validating data from client
  if (fullName.length < 3) {
    return res.status(403).json({
      error: "Full name must be at least 3 characters long",
    });
  }

  if (!email.length) {
    return res.status(403).json({
      error: "Please enter an email",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({
      error: "Email is invalid",
    });
  }

  // Hash password
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    const username = await generateUsername(email);

    // Create a user
    let user = await new User({
      personalInfo: {
        fullName,
        email,
        password: hashedPassword,
        username,
      },
    });

    await user
      .save()
      .then((u) => {
        return res.status(200).json(formatDataToSend(u));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({
            error: `Email '${email}' already exists`,
          });
        }
        res.status(500).json({
          error: err.message,
        });
      });
  });

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter",
    });
  }
};

/* 
    @title Sign In
    @route POST /api/auth/signin
    @desc Sign in user
    @access Public
*/
const signIn = (req, res) => {
  return res.json(req.body);
};

export { signUp, signIn };
