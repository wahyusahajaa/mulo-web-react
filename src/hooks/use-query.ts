import { useLocation } from "react-router";

export const UseQuery = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};
