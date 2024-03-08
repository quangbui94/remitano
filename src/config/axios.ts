import { AxiosRequestConfig } from "axios";

export const AuthConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
};

export const BaseConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
};