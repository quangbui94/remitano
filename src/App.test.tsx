import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing
import App from "App";
import { SocketProvider } from "contexts/SocketIOProvider";
import AuthProvider, { AuthContext } from "contexts/AuthProvider";

describe("App", () => {
  test("renders layout and home component for / route", () => {
    const { getByTestId } = render(
      <SocketProvider>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </SocketProvider>
    );

    expect(getByTestId("layout")).toBeInTheDocument();
    expect(getByTestId("home")).toBeInTheDocument();
  });

  test("renders layout and not share component for /share route", () => {
    const { getByTestId, queryByText } = render(
      <SocketProvider>
        <MemoryRouter initialEntries={["/share"]}>
          <App />
        </MemoryRouter>
      </SocketProvider>
    );

    expect(getByTestId("layout")).toBeInTheDocument();
    expect(queryByText("Welcome user")).not.toBeInTheDocument();
  });

  test("renders layout and share component for /share route", () => {
    const { getByTestId } = render(
      <SocketProvider>
        <AuthContext.Provider
          value={{
            auth: true,
            login: jest.fn(),
            logout: jest.fn(),
            email: "test@gmail.com",
          }}
        >
          <MemoryRouter initialEntries={["/share"]}>
            <App />
          </MemoryRouter>
        </AuthContext.Provider>
      </SocketProvider>
    );

    expect(getByTestId("layout")).toBeInTheDocument();
    expect(getByTestId("share")).toBeInTheDocument();
  });
});
