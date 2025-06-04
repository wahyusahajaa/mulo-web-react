import api from "@/lib/axiosInstance";
import type { ErrorResponse } from "@/types/error.type";
import type { PaginateResponse, User } from "@/types/types";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { LoaderFunction } from "react-router";

export const userLoader: LoaderFunction = async () => {
  const usersPromise = api
    .get<PaginateResponse<User[]>>("/users")
    .then((res) => res.data)
    .catch((error) => {
      const handleError = handleAxiosError<ErrorResponse>(error);
      throw new Response(handleError.message, {
        status: handleError.code as number,
      });
    });

  return { usersPromise };
};
