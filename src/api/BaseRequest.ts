import { AxiosResponse } from "axios";
import { HTTPClient } from "api/HttpClient";

export interface APIResponse<T> {
  data: T;
  succeeded?: boolean;
  errors: any;
}

export interface IBaseRequest<T> {
  get(id: string): Promise<APIResponse<T>>;
  getAll(): Promise<APIResponse<T[]>>;
  create(item: T): Promise<APIResponse<T>>;
  update(id: string, item: T): Promise<APIResponse<T>>;
  delete(id: string): Promise<APIResponse<T>>;
}

export const transform = (
  response: AxiosResponse
): Promise<APIResponse<any>> => {
  return new Promise((resolve, reject) => {
    const result: APIResponse<any> = {
      data: response.data,
      succeeded: response.data["success"],
      errors: response.data.errors,
    };
    resolve(result);
  });
};

export abstract class BaseRequest<T>
  extends HTTPClient
  implements IBaseRequest<T>
{
  protected collection: string;

  public async get(id: string): Promise<APIResponse<T>> {
    const instance = this.createInstance();
    return await instance.get(`/${this.collection}/${id}`).then(transform);
  }

  public async getAll(): Promise<APIResponse<T[]>> {
    const instance = this.createInstance();
    return await instance.get(`/${this.collection}`).then(transform);
  }

  public async create(item: T): Promise<APIResponse<T>> {
    const instance = this.createInstance();
    return await instance.post(`/${this.collection}/`, item).then(transform);
  }

  public async update(id: string, item: T): Promise<APIResponse<T>> {
    const instance = this.createInstance();
    return await instance.put(`${this.collection}/${id}`, item).then(transform);
  }

  public async delete(id: string) {
    const instance = this.createInstance();
    return await instance.delete(`${this.collection}/${id}`).then(transform);
  }
}
