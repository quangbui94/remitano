import axios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosRequestConfig,
} from "axios";
import { BaseConfig } from "config/axios";

export abstract class HTTPClient {
  protected instance: AxiosInstance;
  protected config: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig = BaseConfig) {
    this.config = config;
  }

  protected createInstance(): AxiosInstance {
    this.instance = axios.create(this.config);
    this.initializeResponseInterceptor();
    return this.instance;
  }

  protected initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
    const token = localStorage.getItem("jwtToken");
    this.instance.interceptors.request.use((config) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
      return config;
    });
  }

  private handleResponse(response: AxiosResponse) {
    return response;
  }

  private handleError(error: any) {
    return Promise.reject(error);
  }
}
