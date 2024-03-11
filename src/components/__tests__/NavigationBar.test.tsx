import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "contexts/AuthProvider";
import NavigationBar from "components/NavigationBar/NavigationBar";

describe("NavigationBar Component", () => {
  test("calls login or logout based on authentication status", () => {
    const loginMock = jest.fn();
    const logoutMock = jest.fn();
    const { getByRole } = render(
      <Router>
        <AuthContext.Provider
          value={{
            auth: false,
            login: loginMock,
            logout: logoutMock,
            email: "",
          }}
        >
          <NavigationBar />
        </AuthContext.Provider>
      </Router>
    );

    // Get the login/logout button
    const loginButton = getByRole("button", { name: "Login/Register" });

    // Simulate a click on the login/logout button
    fireEvent.click(loginButton);

    // Expect login function to be called when not authenticated
    expect(loginMock).toHaveBeenCalled();

    // Rerender the component with authenticated status
    render(
      <Router>
        <AuthContext.Provider
          value={{
            auth: true,
            login: loginMock,
            logout: logoutMock,
            email: "test@example.com",
          }}
        >
          <NavigationBar />
        </AuthContext.Provider>
      </Router>
    );

    // Simulate another click on the login/logout button
    fireEvent.click(loginButton);

    // Expect logout function to be called when authenticated
    expect(logoutMock).toHaveBeenCalled();
  });
});
