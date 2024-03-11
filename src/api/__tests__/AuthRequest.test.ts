import { AuthRequest } from "../AuthRequest";

describe("AuthRequest", () => {
  let authRequest: AuthRequest;

  describe("login", () => {
    it('should send a POST request to "auth/login" endpoint with the provided item', async () => {
      const item = {
        email: "testuser@example.com",
        username: "testuser",
        password: "testpassword",
      };
      const expectedResponse = {
        data: { email: "testuser@example.com" },
        errors: undefined,
        succeeded: undefined,
      };

      // Mock the createInstance method
      authRequest = new AuthRequest();
      authRequest["createInstance"] = jest.fn().mockReturnValue({
        post: jest.fn().mockResolvedValue({ data: expectedResponse }),
      });

      const response = await authRequest.login(item);

      expect(authRequest["createInstance"]).toHaveBeenCalled();
      expect(authRequest["createInstance"]().post).toHaveBeenCalledWith(
        "auth/login",
        item
      );
      expect(response.data).toEqual(expectedResponse);
    });
  });
});
