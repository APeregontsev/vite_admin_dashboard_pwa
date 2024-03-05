import { useLocation } from "react-router-dom";

export const useCurrentPath = () => {
  const { pathname } = useLocation();

  const addressParts = pathname.split("/");

  const addressPath = addressParts[addressParts.length - 1].toLowerCase();

  return { addressPath };
};
