import { trimArray, isValidYoutubeUrl, getVideoIdFromUrl } from "utils";

describe("trimArray", () => {
  test("trims string to max length and appends ... if longer", () => {
    const input = "This is a long string that exceeds the maximum length";
    const maxLength = 20;
    const result = trimArray(input, maxLength);
    expect(result.length).toBe(maxLength + 3); // Length should be maxLength + 3 for '...'
    expect(result.endsWith("...")).toBe(true); // Should end with '...'
  });

  test("does not trim string if within max length", () => {
    const input = "Short string";
    const maxLength = 20;
    const result = trimArray(input, maxLength);
    expect(result).toBe(input); // Result should be same as input if within max length
  });
});

describe("isValidYoutubeUrl", () => {
  test("returns true for valid YouTube URLs", () => {
    const validUrls = [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://youtu.be/dQw4w9WgXcQ",
      // Add more valid URLs as needed
    ];
    validUrls.forEach((url) => {
      expect(isValidYoutubeUrl(url)).toBe(true);
    });
  });

  test("returns false for invalid YouTube URLs", () => {
    const invalidUrls = [
      "https://www.example.com",
      "https://www.youtube.com/watch",
      // Add more invalid URLs as needed
    ];
    invalidUrls.forEach((url) => {
      expect(isValidYoutubeUrl(url)).toBe(false);
    });
  });
});

describe("getVideoIdFromUrl", () => {
  test("returns video ID from valid YouTube URL", () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const expectedId = "dQw4w9WgXcQ";
    expect(getVideoIdFromUrl(url)).toBe(expectedId);
  });

  test("returns empty string for invalid YouTube URL", () => {
    const invalidUrl = "https://www.example.com";
    expect(getVideoIdFromUrl(invalidUrl)).toBe("");
  });
});
