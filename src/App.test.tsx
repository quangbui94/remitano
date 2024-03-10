import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Use MemoryRouter for testing
import App from "App";
import { SocketProvider } from "contexts/SocketIOProvider";
import Layout from "components/Layout/Layout";
import Home from "routes/Home/Home";
import Share from "routes/Share/Share";

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

  test("renders layout and share component for /share route", () => {
    const { getByTestId } = render(
      <SocketProvider>
        <MemoryRouter initialEntries={["/share"]}>
          <App />
        </MemoryRouter>
      </SocketProvider>
    );

    expect(getByTestId("layout")).toBeInTheDocument();
    expect(getByTestId("share")).toBeInTheDocument();
  });
});
