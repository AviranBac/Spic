import axios, { AxiosInstance } from "axios";
import { config } from "../config/config";

const instance: AxiosInstance = axios.create({
  baseURL: config.serverUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default instance;