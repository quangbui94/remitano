import { AxiosRequestConfig } from "axios";

export const AuthConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
};

export const VideoConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
};

export const BaseConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
};
