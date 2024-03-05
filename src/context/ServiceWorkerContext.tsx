import React, { useContext, useState, createContext, FC, useEffect, useRef } from "react";

type AuthProviderProps = { children: React.ReactNode };
type SWContext = {
  oldWorker: any;
  newWorker: any;
  isUpdateAvailable: boolean;
};

// Creating Context
const SWContext = createContext<SWContext>({
  oldWorker: undefined,
  newWorker: undefined,
  isUpdateAvailable: false,
});

// Custom hook to get values from context
export function useServiceWorker() {
  return useContext(SWContext);
}

// Component returning context
export const ServiceWorkerProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);

  const oldWorker = useRef<ServiceWorkerRegistration | null>();
  const newWorker = useRef<ServiceWorker | null>();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Register the service worker
      navigator.serviceWorker
        .register("/serviceWorker.js", { scope: "/" })
        .then((reg) => {
          oldWorker.current = reg;

          if (reg.waiting?.state === "installed" && !isUpdateAvailable) setIsUpdateAvailable(true);

          // Listener to REGISTRATION
          oldWorker.current?.addEventListener("updatefound", () => {
            // An updated service worker has appeared in reg.installing!

            newWorker.current = reg.installing;

            newWorker.current?.addEventListener("statechange", () => {
              // Has service worker state changed?
              switch (newWorker.current?.state) {
                case "installed":
                  setIsUpdateAvailable(true);
                  break;
                case "activated":
                  setIsUpdateAvailable(false);
                  break;
              }
            });
          });
        })
        .catch(function (err) {
          // registration failed :(
          console.log("ServiceWorker registration failed: ", err);
        });
    }
  }, []);

  const value = {
    oldWorker,
    newWorker,
    isUpdateAvailable,
  };

  return <SWContext.Provider value={value}>{children}</SWContext.Provider>;
};
