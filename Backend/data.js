const express = require("express");
const router = express.Router();
const User = require("./userschema.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("./config/emailTemplates");
const async = require("async");
const sendEmail = require("../Backend/config/nodemailer");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};
router.post("/signup", async (req, res) => {
  const { name, email, password, bio, interest } = req.body;
  if (!name || !email || !password) {
    return res.json({
      message: "Please fill all the fields",
      success: false,
    });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    return res.json({
      message: "user already exists",
      success: false,
    });
  } else {
    const hashed_Pass = await bcrypt.hash(password, 10);
    const data = new User({
      name: name,
      email: email,
      password: hashed_Pass,
      Bio: bio,
      interest: interest,
    });
    await data.save();
    await sendEmail(email, nodemailer.confirmEmailTemp(data._id, data.name));

    return res.status(201).json({
      message:
        "Email sent, Please check your Mail to confirm your registration",
      success: true,
    });
  }
});

router.get("/confirm/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.confirmed) {
      return res.json({ message: "User already confirmed", success: false });
    } else {
      user.confirmed = true;
      await user.save();
      return res.json({
        success: true,
        message: "Email Confirmed, Account Successfully Created",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "enter details",
      });
    }
    const user = await User.login(email, password);
    if (user === "Incorrect Password!!!" || user === "Incorrect Email!!!") {
      return res.json({
        success: false,
        message: "Credentials seems to be wrong",
      });
    }

    if (!user.confirmed) {
      return res.json({
        success: false,
        message: "user not confirmed, first confirm your email first",
      });
    } else {
      const token = createToken(user._id);

      const userDetails = {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
      };
      return res.status(200).json({
        success: true,
        token,
        userDetails,
        message: "Logged in Successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/update", async (req, res) => {
  try {
    const { name, email, bio, interest, userId } = req.body;
    // const { id } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "some error occurred , please try again",
      });
    }
    let flag = 0;
    if (name) {
      user.name = name;
      flag = 1;
    }
    if (email) {
      user.email = email;
      flag = 1;
    }
    if (bio) {
      user.bio = bio;
      flag = 1;
    }
    if (interest) {
      user.interest = interest;
      flag = 1;
    }
    if (flag === 0) {
      return res.json({
        success: false,
        message: "please add atleast one detail to update",
      });
    } else {
      await user.save();
      const userDetails = {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
      };
      return res.status(200).json({
        success: true,
        userDetails,
        message: "Updated",
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
