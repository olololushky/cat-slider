import axios from "axios";

let axiosInstance = axios.create({
  responseType: "json",
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "origin",
  },
});

export const setupAxios = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      return config;
    },
    (error) => {
      console.error("axios error: ", error);
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
