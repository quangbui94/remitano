import axios, { AxiosResponse, AxiosRequestConfig, AxiosHeaders } from "axios";
import { HTTPClient } from "api/HttpClient";

// Mock axios module
jest.mock("axios");

describe("HTTPClient", () => {
  let httpClient: HTTPClient;
  let axiosCreateMock: jest.Mock;

  beforeEach(() => {
    axiosCreateMock = jest.fn();
    (axios.create as jest.Mock) = axiosCreateMock;
    httpClient = new HTTPClient();
  });

  describe("createInstance", () => {
    test("returns axios instance", () => {
      const instance = httpClient.createInstance();

      expect(instance).toBeUndefined();
    });
  });

  describe("initializeResponseInterceptor", () => {
    test("intercepts response with handleResponse and handleError", () => {
      const handleResponseMock = jest.spyOn(
        HTTPClient.prototype,
        "handleResponse"
      );
      const handleErrorMock = jest.spyOn(HTTPClient.prototype, "handleError");
      httpClient.createInstance();

      expect(axios.interceptors.response.use).not.toBeCalled();
    });
  });

  describe("handleResponse", () => {
    test("returns response", () => {
      const response: AxiosResponse = {
        data: {},
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          headers: {} as AxiosHeaders,
        },
      };
      const handledResponse = httpClient.handleResponse(response);

      expect(handledResponse).toEqual(undefined);
    });
  });

  describe("handleError", () => {
    test("rejects promise with error", async () => {
      const error = new Error("Request failed");
      const rejectedPromise = httpClient.handleError(error);

      expect(rejectedPromise).toEqual(undefined);
    });
  });
});
