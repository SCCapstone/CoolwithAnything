const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:AaTwB45lXeYyYaNJ@cluster0.2pueiss.mongodb.net/Users?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const User = require("./models/User");
const bcrypt = require("bcryptjs");

// Register User
app.post("/register", async (req, res) => {
  try {
    const { username, password, email, name, phone_number, date_of_birth } =
      req.body;
    // Validate user input...

    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      username,
      name,
      email,
      phone_number,
      date_of_birth,
      password: hashedPassword,
    });
    await user.save();

    // Send response with user ID
    res
      .status(201)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering new user" });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validate user input...

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

app.post("/updateBiometrics", async (req, res) => {
  const { username, height, weight, fitnessLevel, fitnessGoal } = req.body;

  try {
    // Check if the user exists
    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's biometrics
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { height, weight, fitnessLevel, fitnessGoal } },
      { new: true } // This option returns the document after update
    );

    // Check if the update was successful
    if (!updatedUser) {
      return res.status(404).json({ message: "Unable to update user" });
    }

    // Send the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating biometrics:", error);
    res.status(500).json({ message: "Error updating biometrics" });
  }
});


