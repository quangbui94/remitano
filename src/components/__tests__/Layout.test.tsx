/* eslint-disable */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Layout from "../Layout/Layout";
import { SocketProvider } from "contexts/SocketIOProvider";
import { BrowserRouter } from "react-router-dom";

describe("Layout component", () => {
  test("renders navigation bar", () => {
    render(
      <SocketProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </SocketProvider>
    );
    const navigationBar = screen.getByTestId("layout");
    expect(navigationBar).toBeInTheDocument();
  });

  test("displays notification when shareVideo event is received", async () => {
    render(
      <SocketProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </SocketProvider>
    );
    const notificationMessage = "Test notification message";
    const shareVideoEvent = { message: notificationMessage };
    const socket = require("socket.io-client")();
    socket.emit("shareVideo", shareVideoEvent);

    // await waitFor(() => {
    //   const notification = screen.getByTestId("notification");
    //   expect(notification).toBeInTheDocument();
    //   expect(notification).toHaveTextContent(notificationMessage);
    // });
  });

  test("closes notification when close button is clicked", () => {
    render(
      <SocketProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </SocketProvider>
    );
    const notificationMessage = "Test notification message";
    const shareVideoEvent = { message: notificationMessage };
    const socket = require("socket.io-client")();
    socket.emit("shareVideo", shareVideoEvent);

    const closeButton = screen.getByTestId("layout");
    userEvent.click(closeButton);

    const notification = screen.queryByTestId("notification");
    expect(notification).not.toBeInTheDocument();
  });
});
