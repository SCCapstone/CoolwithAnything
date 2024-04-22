import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddTask from "../components/AddTask";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Ensuring consistent mock returns for every test instance
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

// Mock Firebase and navigation
jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(() => ({
      currentUser: { uid: "123" },
      signOut: jest.fn().mockResolvedValue(),
    })),
  };
});

jest.mock("firebase/firestore", () => {
  return {
    getFirestore: jest.fn(),
    doc: jest.fn(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          data: () => ({
            firstName: "John",
            lastName: "Doe",
            phone_number: "1234567890",
          }),
        })
      ),
    })),
    getDoc: jest.fn(() =>
      Promise.resolve({
        exists: () => true,
        data: () => ({ firstName: "John", lastName: "Doe" }),
      })
    ),
  };
});

jest.mock("../services/AuthAPI", () => ({
  saveTaskForUser: jest.fn().mockResolvedValue(),
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

jest.mock("../components/DateTimePicker", () => "DateTimePicker");
jest.mock("../components/TypeSelector", () => "TypeSelector");
jest.mock("../components/CreateButton", () => "CreateButton");

jest.mock("../services/ThemeContext", () => ({
  useTheme: () => ({
    theme: "light",
    toggleTheme: jest.fn(),
  }),
}));

describe("AddTask", () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    // Mock useNavigation with specific implementations for each test
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });
  });

  it("renders correctly with initial route params", () => {
    const route = { params: { userID: "123" } };
    const { getByPlaceholderText } = render(<AddTask route={route} />);
    expect(getByPlaceholderText("Name")).toBeTruthy();
  });

  it("handles input changes", () => {
    const route = { params: { userID: "123" } };
    const { getByPlaceholderText } = render(<AddTask route={route} />);
    const nameInput = getByPlaceholderText("Name");
    fireEvent.changeText(nameInput, "New Task");
    expect(nameInput.props.value).toBe("New Task");
  });

  it("calls the save task API and navigates on successful task creation", async () => {
    const route = { params: { userID: "123" } };
    const { getByTestId, getByPlaceholderText } = render(<AddTask route={route} />);
    const nameInput = getByPlaceholderText("Name");
    fireEvent.changeText(nameInput, "New Task");
    fireEvent.changeText(getByPlaceholderText("Location"), "Home");
    fireEvent.changeText(getByPlaceholderText("Comments"), "Test comment");
    fireEvent.changeText(getByTestId("priority-selector"), "high");
    fireEvent.press(getByTestId("create-task-button"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success", "Task created successfully!"
      );
    });
  

  });
  
});
