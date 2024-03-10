import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "contexts/SocketIOProvider";
import { useNavigate } from "react-router-dom";

import Share from "routes/Share/Share";
import { AuthContext } from "contexts/AuthProvider";
import { VideoRequest } from "api/VideoRequest";

jest.mock("contexts/AuthProvider");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

class CustomError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

describe("Share Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test("submits form with valid YouTube URL", async () => {
    // Mock useContext to return a mocked context value
    const mockContextValue = {
      email: "test@example.com",
      auth: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    // Mock the implementation of shareVideo method
    const mockShareVideo = jest
      .fn()
      .mockResolvedValueOnce({ data: { id: "123", title: "Test Video" } });
    VideoRequest.prototype.shareVideo = mockShareVideo;

    // Render the Share component
    const { getByLabelText, getByText } = render(
      <SocketProvider>
        <BrowserRouter>
          <AuthContext.Provider value={mockContextValue}>
            <Share />
          </AuthContext.Provider>
        </BrowserRouter>
      </SocketProvider>
    );

    // Fill and submit the form
    fireEvent.change(getByLabelText("YouTube URL"), {
      target: { value: "https://www.youtube.com/watch?v=abcd1234567" },
    });
    fireEvent.click(getByText("Share"));

    // Wait for the form submission and successful notification
    await waitFor(() => {
      // Check if shareVideo method is called with correct arguments
      expect(mockShareVideo).toHaveBeenCalledWith({
        email: mockContextValue.email,
        embedId: "abcd1234567",
      });

      // Check if success notification is displayed
      expect(getByText("Video shared Successful!")).toBeInTheDocument();
    });
  });

  test("submits form with invalid YouTube URL", async () => {
    // Mock useContext to return a mocked context value
    const mockContextValue = {
      email: "test@example.com",
      auth: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    // Mock the implementation of shareVideo method
    const mockShareVideo = jest
      .fn()
      .mockResolvedValueOnce({ data: { id: "123", title: "Test Video" } });
    VideoRequest.prototype.shareVideo = mockShareVideo;

    // Render the Share component
    const { getByLabelText, getByText } = render(
      <SocketProvider>
        <BrowserRouter>
          <AuthContext.Provider value={mockContextValue}>
            <Share />
          </AuthContext.Provider>
        </BrowserRouter>
      </SocketProvider>
    );

    // Fill and submit the form
    fireEvent.change(getByLabelText("YouTube URL"), {
      target: { value: "https://www.youtube.com/watch?v=abcd12345" },
    });
    fireEvent.click(getByText("Share"));

    // Wait for the form submission and successful notification
    await waitFor(() => {
      // Check if shareVideo method is called with correct arguments
      expect(mockShareVideo).not.toBeCalled();

      // Check if success notification is displayed
      expect(getByText("Please enter a valid YouTube URL")).toBeInTheDocument();
    });
  });

  test("clicking back button navigates to home page", () => {
    // Mock useContext to return a mocked context value
    const mockContextValue = {
      email: "test@example.com",
      auth: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    // Mock useNavigate hook
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Render the ShareLinkBox component
    const { getByText } = render(
      <SocketProvider>
        <BrowserRouter>
          <AuthContext.Provider value={mockContextValue}>
            <Share />
          </AuthContext.Provider>
        </BrowserRouter>
      </SocketProvider>
    );

    // Click the back button
    fireEvent.click(getByText("Back"));

    // Check that the navigate function is called with the expected route
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});