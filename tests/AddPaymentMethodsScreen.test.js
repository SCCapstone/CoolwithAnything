import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddPaymentMethodsScreen from "../screens/AddPaymentMethodsScreen";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";
import * as AuthAPI from "../services/AuthAPI";
import { useNavigation } from "@react-navigation/core";
import { fi } from "date-fns/locale";

// Mock dependencies
jest.mock("react-native", () => {
  const actualRN = jest.requireActual("react-native");
  return {
    ...actualRN,
    Alert: { alert: jest.fn() },
  };
});

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

jest.mock("@react-navigation/core", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock("../services/AuthAPI", () => ({
  savePaymentMethodForUser: jest.fn(),
  fetchAllPaymentMethodsForUser: jest.fn(),
}));

jest.mock("../services/ThemeContext", () => ({
  useTheme: () => ({
    theme: "light",
    toggleTheme: jest.fn(),
  }),
}));

describe("AddPaymentMethodsScreen", () => {
  const fillInputsAndSubmit = (getByTestId) => {
    fireEvent.changeText(getByTestId("input-nickname"), "Visa");
    fireEvent.changeText(getByTestId("input-credit-card"), "1234567890123456");
    fireEvent.changeText(getByTestId("input-cvc"), "123");
    fireEvent.changeText(getByTestId("input-exp-month"), "12");
    fireEvent.changeText(getByTestId("input-exp-year"), "2030");
    fireEvent.changeText(getByTestId("input-name"), "John Doe");
    fireEvent.changeText(getByTestId("input-zip"), "12345");
    fireEvent.press(getByTestId("button-save-payment-method"));
  };

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <AddPaymentMethodsScreen />
    );
    expect(getByText("Add Payment Method")).toBeTruthy();
    expect(getByPlaceholderText("My Card")).toBeTruthy();
  });

  it("validates empty fields before saving", () => {
    const { getByTestId } = render(<AddPaymentMethodsScreen />);
    fireEvent.press(getByTestId("button-save-payment-method"));
    expect(Alert.alert).toHaveBeenCalledWith("Nickname is empty");
  });

  it("checks for valid credit card number length", () => {
    const { getByTestId } = render(<AddPaymentMethodsScreen />);
    fireEvent.changeText(getByTestId("input-nickname"), "Visa");
    fireEvent.changeText(getByTestId("input-credit-card"), "123456789012");
    fireEvent.press(getByTestId("button-save-payment-method"));
    expect(Alert.alert).toHaveBeenCalledWith("Invalid credit card");
  });

  it("checks for valid CVC length", () => {
    const { getByTestId } = render(<AddPaymentMethodsScreen />);
    fireEvent.changeText(getByTestId("input-nickname"), "Visa");
    fireEvent.changeText(getByTestId("input-credit-card"), "1234567890123456");
    fireEvent.changeText(getByTestId("input-cvc"), "12");
    fireEvent.press(getByTestId("button-save-payment-method"));
    expect(Alert.alert).toHaveBeenCalledWith("Invalid CVC number");
  });
  it("checks for valid expiration month", () => {
    const { getByTestId } = render(<AddPaymentMethodsScreen />);
    // Fill all other fields correctly
    fireEvent.changeText(getByTestId("input-nickname"), "Visa");
    fireEvent.changeText(getByTestId("input-credit-card"), "1234567890123456");
    fireEvent.changeText(getByTestId("input-cvc"), "123");
    fireEvent.changeText(getByTestId("input-exp-year"), "2030");
    fireEvent.changeText(getByTestId("input-name"), "John Doe");
    fireEvent.changeText(getByTestId("input-zip"), "12345");
  
    // Input an invalid month
    fireEvent.changeText(getByTestId("input-exp-month"), "13");
    fireEvent.press(getByTestId("button-save-payment-method"));
  
    expect(Alert.alert).toHaveBeenCalledWith("Invalid Expiration Date");
  });
  

  it("saves the payment method when all validations pass", async () => {
    AuthAPI.savePaymentMethodForUser.mockResolvedValue();
    AuthAPI.fetchAllPaymentMethodsForUser.mockResolvedValue([]);
    const { getByTestId } = render(<AddPaymentMethodsScreen />);
    fillInputsAndSubmit(getByTestId);

    await waitFor(() => {
      expect(AuthAPI.savePaymentMethodForUser).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        expect.any(String),
        expect.any(Array)
      );
    });
  });

  it("handles save error", async () => {
    const errorMessage = "Network error";
    AuthAPI.savePaymentMethodForUser.mockRejectedValueOnce(
      new Error(errorMessage)
    );
    const { getByTestId } = render(<AddPaymentMethodsScreen />);
    fillInputsAndSubmit(getByTestId);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Failed to save payment method."
      );
    });
  });
  it("displays an error if saving a payment method fails due to network issues", async () => {
    const errorMessage = "Network error";
    AuthAPI.savePaymentMethodForUser.mockRejectedValueOnce(new Error(errorMessage));
    const { getByTestId } = render(<AddPaymentMethodsScreen />);
    fillInputsAndSubmit(getByTestId);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "Failed to save payment method.");
    });
  });
});
