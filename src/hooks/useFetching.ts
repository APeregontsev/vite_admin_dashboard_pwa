import { useState } from "react";
import { useNotify } from "./useNotify";

export const useFetching = (callback: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const notify = useNotify();

  const fetching = async (data?: any) => {
    try {
      setIsLoading(true);
      return await callback(data);
    } catch (error: any) {
      if (error?.code) return notify(error?.code);
      if (!error?.code) return notify(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return { fetching, isLoading };
};
