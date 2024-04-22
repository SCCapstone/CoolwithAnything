import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddMeal from "../components/AddMeal"; // Updated to AddMeal
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMeals } from "../services/MealsContext";

// Mock useMeals to return default values and a function to update these values
jest.mock("../services/MealsContext", () => ({
  useMeals: () => ({
    savedMeals: [], // Default empty array for saved meals
    setSavedMeals: jest.fn(), // Mock function to simulate setting saved meals
  }),
}));

describe("AddMeal", () => {
});
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  })),
  useRoute: () => ({
    params: { userID: "123" },
  }),
}));

// Assuming similar dependencies for AddMeal as AddTask
jest.mock("../services/AuthAPI", () => ({
  addMealData: jest.fn().mockResolvedValue(), // Assume this method handles meal data
}));

jest.mock("react-native", () => {
  const actualRN = jest.requireActual("react-native");
  return {
    ...actualRN,
    Alert: {
      ...actualRN.Alert,
      alert: jest.fn(),
    },
  };
});

jest.mock("../components/CreateButton", () => "CreateButton");
jest.mock("../components/MealHeader", () => "MealHeader"); 

jest.mock("../services/ThemeContext", () => ({
  useTheme: () => ({
    theme: "light",
    toggleTheme: jest.fn(),
  }),
}));

describe("AddMeal", () => {
    const mockNavigate = jest.fn();
    const mockGoBack = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
  
      useNavigation.mockReturnValue({
        navigate: mockNavigate,
        goBack: mockGoBack,
      });
    });
  
    it("renders correctly with initial route params", () => {
      const route = { params: { userID: "123" } };
      const { getByPlaceholderText } = render(<AddMeal route={route} />);
      expect(getByPlaceholderText("Meal Name")).toBeTruthy(); // Adjusted placeholder
    });
  
    it("handles input changes", () => {
      const route = { params: { userID: "123" } };
      const { getByPlaceholderText } = render(<AddMeal route={route} />);
      const nameInput = getByPlaceholderText("Meal Name"); // Adjusted placeholder
      fireEvent.changeText(nameInput, "New Meal");
      expect(nameInput.props.value).toBe("New Meal");
    });
  
    it("adds a new meal and updates state correctly", async () => {
        const { getByPlaceholderText, getByTestId } = render(<AddMeal route={{ params: { userID: "123" } }} />);
        const mealNameInput = getByPlaceholderText("Meal Name");
        const createButton = getByTestId("submit-meal");
        fireEvent.changeText(getByPlaceholderText("Meal Name"), "Pasta");
        fireEvent.changeText(getByPlaceholderText("Add ingredients..."), "Tomato, Cheese");
        fireEvent.changeText(getByPlaceholderText("Servings"), "4");
        fireEvent.changeText(getByPlaceholderText("Add instructions..."), "Cook for 20 minutes");
    
        // Simulate button press
        fireEvent.press(createButton);
      
        await waitFor(() => {
          // Check if the Alert was called with the correct arguments
          expect(Alert.alert).toHaveBeenCalledWith("Confirm", expect.anything(), expect.anything());
          // Simulate user confirming the creation
          const confirmButton = Alert.alert.mock.calls[0][2][1].onPress;
          confirmButton();
        });
      
        // Check if navigation was called after adding the meal
        expect(mockNavigate).toHaveBeenCalledWith("Your Cookbook", { activeTab: "SavedMeals" });
      });
      
  });