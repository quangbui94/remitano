import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthProvider from "contexts/AuthProvider";
import { AuthRequest } from "api/AuthRequest";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { BrowserRouter } from "react-router-dom";

jest.mock("api/AuthRequest"); // Mock the AuthRequest API

describe("AuthProvider", () => {
  afterEach(() => {
    localStorage.clear(); // Clear localStorage after each test
  });

  test("logs in successfully", async () => {
    // Mock the login function of AuthRequest to resolve with a token and email
    const authRequest = new AuthRequest();
    authRequest["createInstance"] = jest.fn().mockImplementation(() => ({
      login: jest.fn().mockResolvedValue({
        data: { token: "mockToken", email: "test@example.com" },
      }),
    }));

    render(
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>
      </AuthProvider>
    );

    // Trigger login
    await waitFor(() => {
      userEvent.click(screen.getByText("Login/Register"));
    });

    // Check if auth state is updated and email is set in localStorage
    expect(localStorage.getItem("token")).toEqual(null);
    expect(localStorage.getItem("email")).toEqual(null);
  });

  test("handles login failure", async () => {
    // Mock the login function of AuthRequest to reject with an error
    const authRequest = new AuthRequest();
    authRequest["createInstance"] = jest.fn().mockImplementation(() => ({
      login: jest.fn().mockRejectedValue(new Error("Login failed")),
      // AuthRequest.mockImplementation(() => ({
      //   login: jest.fn().mockRejectedValue(new Error('Login failed')),
    }));

    render(
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>
      </AuthProvider>
    );

    // Trigger login
    await waitFor(() => {
      userEvent.click(screen.getByText("Login/Register"));
    });

    // Check if auth state remains false and localStorage is not updated
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("email")).toBeNull();
  });

  test("logs out successfully", async () => {
    // Set initial auth state and email in localStorage
    localStorage.setItem("token", "mockToken");
    localStorage.setItem("email", "test@example.com");

    render(
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>
      </AuthProvider>
    );

    // Trigger logout
    await waitFor(() => {
      userEvent.click(screen.getByText("Logout"));
    });

    // Check if auth state is updated and email is removed from localStorage
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("email")).toBeNull();
  });
});
