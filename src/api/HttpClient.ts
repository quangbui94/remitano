import axios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosRequestConfig,
} from "axios";
import { BaseConfig } from "config/axios";

export class HTTPClient {
  protected instance: AxiosInstance;
  protected config: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig = BaseConfig) {
    this.config = config;
  }

  createInstance(): AxiosInstance {
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

  handleResponse(response: AxiosResponse) {
    return response;
  }

  handleError(error: any) {
    return Promise.reject(error);
  }
}
