import { FC, memo, useEffect, useMemo, useState } from "react";
import { Title } from "ui/Titles";
import { capitalizeFirstLetter } from "utils";
import { Header, HeaderItemsWrapper, Offline, TitleWrapper } from "./style";
import { useDebouncedState } from "hooks/useDebouncedState";
import SearchPopup from "./SearchPopup";
import HeaderProfile from "./HeaderProfile";
import HeaderItems from "./HeaderItems";
import { SidebarIconSVG } from "./Icons/headerIcons";
import { useTheme } from "styled-components";
import { useServiceWorker } from "context/ServiceWorkerContext";
import Modal from "common/Modal";
import ServiceWorkerUpdate from "common/Modal/ServiceWorkerUpdate";

type HeaderProps = {
  title: string;
};

const DashboardHeader: FC<HeaderProps> = ({ title }) => {
  const { state: searchQuery, setDebouncedState: setSearchQuery, inProgress } = useDebouncedState(1000);
  const [online, setOnline] = useState(true);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [updateServiceWorker, setUpdateServiceWorker] = useState(false);

  //For Showing Sidebar
  const theme = useTheme();

  useEffect(() => {
    if (!searchQuery) return setShowSearchPopup(false);
    setShowSearchPopup(true);
  }, [searchQuery, inProgress]);

  // Section title to display
  const displayTitle = useMemo(() => {
    return capitalizeFirstLetter(title);
  }, [title]);

  // FOR CHECKING UPDATE OF SW
  const { oldWorker, isUpdateAvailable } = useServiceWorker();

  useEffect(() => {
    if (isUpdateAvailable) setUpdateServiceWorker(true);
  }, [isUpdateAvailable]);

  // Triggering update_available for SPA
  useEffect(() => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update();
    });
  }, [title]);

  function closeUpdateModal() {
    setUpdateServiceWorker(false);
  }

  function refreshServiceWorker() {
    // Post message to ServiceWorker to immediate update
    if (oldWorker.current.waiting) oldWorker.current.waiting.postMessage({ action: "skipWaiting" });

    // Close Update modal
    setUpdateServiceWorker(false);

    // RELOAD A PAGE if you need to load a new data from a new CACHE
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      window.location.reload();
    });
  }

  // For offline message from ServiceWorker

  console.log(navigator.serviceWorker.controller ? "is!!!!!!!!!!!!!!!!!!!" : "is not!!!!!!!!!!!!!!!!!!!!!!");

  useEffect(() => {
    function onLine(): void {
      setOnline(true);
    }

    function offLine(): void {
      setOnline(false);
    }

    window.addEventListener("online", onLine);
    window.addEventListener("offline", offLine);

    if (!navigator.onLine) offLine();

    // Lets check if ServiceWorker took controll over the PAGE, if not - reload the page
    if ("serviceWorker" in navigator && !navigator.serviceWorker.controller) window.location.reload();

    // ----------- OLD logic with message from ServiceWorker -----------
    /*   function handleMessage(event: MessageEvent<any>): void {
      console.log("XXXXXXXXXXXXXXXXXXXXXX", event.data.inet);
      setOnline(event.data.inet);
    }
    navigator.serviceWorker.addEventListener("message", handleMessage);

    return () => navigator.serviceWorker.removeEventListener("message", handleMessage); */

    return () => {
      window.removeEventListener("online", onLine);
      window.removeEventListener("offline", offLine);
    };
  }, []);

  return (
    <Header>
      {showSearchPopup && <SearchPopup searchQuery={searchQuery} onLeave={setShowSearchPopup} />}
      <TitleWrapper>
        <SidebarIconSVG onClick={theme.toggleSideBar} />
        {!online && <Offline>{"offline"}</Offline>}
        <Title $header>{displayTitle}</Title>
      </TitleWrapper>

      <HeaderItemsWrapper>
        <HeaderItems
          searchQuery={searchQuery}
          inProgress={inProgress}
          setSearchQuery={setSearchQuery}
          setShowSearchPopup={setShowSearchPopup}
        />

        <HeaderProfile />
      </HeaderItemsWrapper>

      <Modal isShown={updateServiceWorker} onClose={closeUpdateModal} update>
        <ServiceWorkerUpdate onRefresh={refreshServiceWorker} onCancel={closeUpdateModal} />
      </Modal>
    </Header>
  );
};

export default memo(DashboardHeader);
