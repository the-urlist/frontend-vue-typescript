import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import store from "../store/store";

/* 
  This file overrides the standard axios configuration so that every request has
   the correct headers. 
   
   It also attaches event listeners to requests as they go
   out, and as they come back. This is how the app knows whether or not to display
   the green bar that goes across the top to show activity.

   This file is imported and the init() is called in main.ts
*/

const ApiService = {
  init() {
    axios.defaults.headers.common["x-functions-key"] = config.FUNCTION_KEY;
    axios.defaults.withCredentials = false;

    axios.interceptors.request.use((config: AxiosRequestConfig) => {
      store.dispatch("setAppBusy", true);
      return config;
    });

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        store.dispatch("setAppBusy", false);
        return response;
      },
      err => {
        store.dispatch("setAppBusy", false);
      }
    );
  },

  get(resource: string, requestConfig?: AxiosRequestConfig) {
    return axios.get(`${resource}`, requestConfig);
  },

  post(resource: string, data?: any, requestConfig?: AxiosRequestConfig) {
    return axios.post(`${resource}`, data, requestConfig);
  },

  patch(resource: string, data?: any, requestConfig?: AxiosRequestConfig) {
    return axios.patch(`${resource}`, data, requestConfig);
  },

  destroy(resource: string, requestConfig?: AxiosRequestConfig) {
    return axios.delete(`${resource}`, requestConfig);
  }
};

export default ApiService;
