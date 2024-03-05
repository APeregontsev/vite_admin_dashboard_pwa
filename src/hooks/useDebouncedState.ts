import { useRef, useState } from "react";

export function useDebouncedState(delay: number) {
  const [state, setState] = useState("");
  const [inProgress, setInProgress] = useState(false);

  const timer = useRef<number>();

  function debounce(ms: number) {
    return (value: string) => {
      if (!inProgress) setInProgress(true);

      clearTimeout(timer.current);

      timer.current = window.setTimeout(() => {
        setState(value);
        setInProgress(false);
      }, ms);
    };
  }

  const setDebouncedState = debounce(delay);

  return { state, setDebouncedState, inProgress };
}
