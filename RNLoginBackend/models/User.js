const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  height: {
    type: Number,
    required: false,
    min: 0,
    max: 300,
    default: 180,
  },
  weight: {
    type: Number,
    required: false,
    min: 0,
    max: 300,
    default: 80,
  },
  fitness_level: {
    type: String,
    required: false,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  fitness_goal: {
    type: String,
    required: false,
    enum: ["Lose Weight", "Build Muscle"],
    default: "Lose Weight",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
