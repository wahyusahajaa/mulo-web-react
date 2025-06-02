import axios, { AxiosError } from "axios";

interface HandledError<T = unknown> {
  message: string;
  errors?: T | null;
  code?: number | null;
}

export function handleAxiosError<T = unknown>(error: unknown): HandledError<T> {
  if (axios.isAxiosError<T>(error)) {
    const axiosError = error as AxiosError<T>;
    if (axiosError.response) {
      const data = axiosError.response.data as HandledError<T>;
      if (axiosError.response.status === 400) {
        return {
          message: data.message,
          errors: data.errors,
          code: axiosError.response.status,
        };
      } else if (axiosError.response.status === 500) {
        return {
          message: "Something went wrong. Please try again later.",
          errors: null,
          code: axiosError.response.status,
        };
      } else {
        return {
          message: data.message,
          errors: null,
          code: axiosError.response.status,
        };
      }
    } else if (axiosError.request) {
      console.error(`No response received from server.`);
      return {
        message: "Connection issue. Please check your network.",
        errors: null,
      };
    } else {
      console.error(`Request setup failed: ${axiosError.message}`);
      return {
        message:
          "Something went wrong while preparing your request. Please try again.",
        errors: null,
      };
    }
  }
  console.error("An unknown error occurred:", error);
  return {
    message: "Something went wrong. Please try again later.",
    errors: null,
  };
}
