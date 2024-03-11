import { VideoRequest } from "api/VideoRequest";

jest.mock("axios");

describe("VideoRequest", () => {
  describe("getAllVideos", () => {
    it("returns list of videos", async () => {
      const responseData = [
        {
          id: "1",
          embedId: "abc123",
          title: "Video 1",
          owner: "User 1",
          description: "Description 1",
        },
      ];
      const videoRequest = new VideoRequest();
      videoRequest["createInstance"] = jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: responseData }),
      });
      const result = await videoRequest.getAllVideos();
      expect(result.data).toEqual(responseData);
    });
  });

  describe("shareVideo", () => {
    it("shares video", async () => {
      const responseData = [
        {
          id: "1",
          embedId: "abc123",
          title: "Video 1",
          owner: "User 1",
          description: "Description 1",
        },
      ];
      const videoRequest = new VideoRequest();
      videoRequest["createInstance"] = jest.fn().mockReturnValue({
        post: jest.fn().mockResolvedValue({ data: responseData }),
      });
      const result = await videoRequest.shareVideo({
        embedId: "abc123",
        email: "User 1",
      });
      expect(result.data).toEqual(responseData);
    });
  });
});
