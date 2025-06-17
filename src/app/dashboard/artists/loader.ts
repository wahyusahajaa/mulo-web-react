import api from "@/lib/axiosInstance";
import type { ErrorResponse } from "@/types/error.type";
import type { Artist, PaginateResponse } from "@/types/types";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { LoaderFunction } from "react-router";

export const artistLoader: LoaderFunction = async () => {
  const artistsPromise = api
    .get<PaginateResponse<Artist[]>>("/artists")
    .then((res) => res.data)
    .catch((error) => {
      const handleError = handleAxiosError<ErrorResponse>(error);
      throw new Response(handleError.message, {
        status: handleError.code as number,
      });
    });

  return { artistsPromise };
};
