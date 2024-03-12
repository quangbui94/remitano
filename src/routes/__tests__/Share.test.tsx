/**
 * @jest-environment jsdom
 */
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

  test("handles error when sharing video", async () => {
    // Mock useContext to return a mocked context value
    const mockContextValue = {
      email: "test@example.com",
      auth: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    // Mock the implementation of shareVideo method to throw an error
    const mockShareVideo = jest.fn().mockRejectedValueOnce({
      response: {
        data: {
          success: false,
          message: "Failed to share video",
        },
      },
    });
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

    // Wait for the form submission and error notification
    await waitFor(() => {
      // Check if shareVideo method is called with correct arguments
      expect(mockShareVideo).toHaveBeenCalledWith({
        email: mockContextValue.email,
        embedId: "abcd1234567",
      });

      // Check if error notification is displayed
      expect(getByText("Failed to share video")).toBeInTheDocument();
    });
  });
});

// test("closes notification when handleNotificationClose is called", async () => {
//   const mockContextValue = {
//     email: "test@example.com",
//     auth: true,
//     login: jest.fn(),
//     logout: jest.fn(),
//   };
//   // Render the Share component
//   const { getByLabelText, getByText, queryByText } = render(
//     <SocketProvider>
//       <BrowserRouter>
//         <AuthContext.Provider value={mockContextValue}>
//           <Share />
//         </AuthContext.Provider>
//       </BrowserRouter>
//     </SocketProvider>
//   );

//   // Set notificationOpen to true
//   fireEvent.change(getByLabelText("YouTube URL"), {
//     target: { value: "https://www.youtube.com/watch?v=abcd1234567" },
//   });
//   fireEvent.click(getByText("Share"));

//   // Check if notification is initially open
//   await waitFor(() => {
//     expect(getByText("Video shared Successful!")).toBeInTheDocument();
//   })

//   // Call handleNotificationClose
//   // handleNotificationClose();

//   // Check if notification is closed
//   // expect(queryByText("Video shared Successful!")).toBeNull();
// });
