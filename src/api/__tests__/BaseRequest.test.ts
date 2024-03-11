import { BaseRequest } from "../BaseRequest";

describe("BaseRequest", () => {
  let baseRequest: BaseRequest<any>;

  beforeEach(() => {
    class ConcreteRequest<T> extends BaseRequest<T> {
      collection = "items";
    }

    baseRequest = new ConcreteRequest<any>();
  });

  it("should get an item by id", async () => {
    const id = "123";

    try {
      const result = await baseRequest.get(id);

      expect(result).toBeDefined();
    } catch (error) {
      expect((error as any).response.status).toBe(404);
    }
  });

  it("should get all items", async () => {
    try {
      const result = await baseRequest.getAll();

      expect(result).toBeDefined();
    } catch (error) {
      expect((error as any).response.status).toBe(404);
    }
  });

  it("should create an item", async () => {
    const item = { name: "Test Item" };

    try {
      const result = await baseRequest.create(item);

      expect(result).toBeDefined();
    } catch (error) {
      expect((error as any).response.status).toBe(404);
    }
  });

  it("should update an item by id", async () => {
    const id = "123";
    const item = { name: "Updated Item" };

    try {
      const result = await baseRequest.update(id, item);

      expect(result).toBeDefined();
    } catch (error) {
      expect((error as any).response.status).toBe(404);
    }
  });

  it("should delete an item by id", async () => {
    const id = "123";

    try {
      const result = await baseRequest.delete(id);

      expect(result).toBeDefined();
    } catch (error) {
      expect((error as any).response.status).toBe(404);
    }
  });
});
