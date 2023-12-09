import axios from "axios";

const BASE_URL = "http://10.0.2.2:3000"; // Replace with your server's address and port

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

export const registerUser = async (
  username,
  password,
  email,
  name,
  phone_number,
  date_of_birth
) => {
  try {
    let response = await fetch(`${BASE_URL}/register`, {
      // Use BASE_URL here
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        name: name,
        phone_number: phone_number,
        date_of_birth: date_of_birth,
      }),
    });
    let json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    console.error("Something wrong",error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const updateBiometrics = async (
  username,
  height,
  weight,
  fitnessLevel,
  fitnessGoal
) => {
  try {
    const response = await axios.post(`${BASE_URL}/updateBiometrics`, {
      username,
      height,
      weight,
      fitnessLevel,
      fitnessGoal,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
