import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  onOutsideClick: (val: boolean) => void
) => {
  // To close DROPDOWN menu on outside CLICK
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (!ref?.current?.parentNode?.contains(event.target as Node)) {
        onOutsideClick(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Close popup on Escape key pressed
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOutsideClick(false);
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", closeOnEscapePressed);
    };
  }, []);
};
