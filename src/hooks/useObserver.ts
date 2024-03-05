import { MutableRefObject, useEffect, useRef } from "react";

export function useObserver(
  observeElement: MutableRefObject<any>,
  rootElement: MutableRefObject<any>,
  activeTab: string,
  page: number,
  canLoad: boolean,
  callback: () => void
) {
  // Lets create REF to save there Observer
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!observeElement.current) return;
    if (observer.current) observer.current.disconnect();

    const callbackExecute = function (entries: IntersectionObserverEntry[]) {
      if (!canLoad && observer.current) observer.current.disconnect();

      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    // Lets put observer into REF
    observer.current = new IntersectionObserver(callbackExecute, { root: rootElement.current });
    observer.current.observe(observeElement.current as HTMLElement);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [activeTab, page]);
}
