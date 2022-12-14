import axios from "axios";
import * as Sentry from "@sentry/gatsby";

const customAxios = axios.create();

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Sentry.captureException(error, {
      extra: {
        error: error.response.data,
        request: error.request.__sentry_xhr__,
      },
    });
    return Promise.reject(error);
  }
);

export default customAxios;
