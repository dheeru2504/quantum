// import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";




export const registerController = async (req, res) => {
  try {
    const { name, email, password, dob } =
      req.body;
    //Validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!dob) {
      return res.send({ message: "dob Number is required" });
    }

    //check user exist or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      dob,
    }).save();

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Occur during Registration",
      error,
    });
  }
};

//LOGIN || PoST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login")
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Respond with user info and token
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        dob: user.dob,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};




//All Users
export const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find();

    if (users.length === 0) {
      // If no users are found, respond with 404 Not Found
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    console.log("first");
    console.log(users);

    // Respond with 200 OK and the list of users
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error while getting users:", error);

    // Respond with 500 Internal Server Error
    res.status(500).send({
      success: false,
      message: "Error while getting users",
      error: error.message,
    });
  }
};

