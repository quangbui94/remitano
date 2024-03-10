import { render, waitFor } from "@testing-library/react";
import Home from "routes/Home/Home";
import { VideoRequest } from "api/VideoRequest";

// Mock the VideoRequest module
jest.mock("api/VideoRequest");

// Define a mock response data for testing
const mockVideoResponse = [
  {
    embedId: "video1",
    title: "Title 1",
    owner: "Owner 1",
    description: "Description 1",
  },
  {
    embedId: "video2",
    title: "Title 2",
    owner: "Owner 2",
    description: "Description 2",
  },
];

describe("Home Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  test("renders video cards after fetching data", async () => {
    // Mock the implementation of getAllVideos method to return mockVideoResponse
    const mockGetAllVideos = jest
      .fn()
      .mockResolvedValueOnce({ data: mockVideoResponse });
    VideoRequest.prototype.getAllVideos = mockGetAllVideos;

    // Render the Home component
    const { getAllByTestId } = render(<Home />);

    // Wait for data to be loaded
    await waitFor(() => {
      // Check if video cards are rendered
      const videoCards = getAllByTestId("video-card");
      expect(videoCards).toHaveLength(mockVideoResponse.length);

      // Check if video card titles are rendered correctly
      mockVideoResponse.forEach((video, index) => {
        expect(videoCards[index]).toHaveTextContent(video.title);
      });
    });
  });
});
