import { isEmpty } from "lodash";
import { FC, FormEvent, useState } from "react";
import { SearchInput } from "ui/Input";
import { SpinnerIconSVG, SearchIconSVG, NotificationIconSVG } from "../Icons/headerIcons";
import Notifications from "../NotificationsPopup";
import { SearchIconWrapper, NotificationWrapper, ItemsWrapper } from "./style";
import { useAppSelector } from "store/store";

type HeaderItemsProps = {
  searchQuery: string;
  inProgress: boolean;
  setSearchQuery: (val: string) => void;
  setShowSearchPopup: (val: boolean) => void;
};

const HeaderItems: FC<HeaderItemsProps> = ({
  searchQuery,
  inProgress,
  setSearchQuery,
  setShowSearchPopup,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  function notificationsHandler() {
    setShowNotifications((state) => !state);
  }

  function showSearchHandler() {
    setShowSearch((state) => !state);
    setShowSearchPopup(false);
  }

  function searchQueryHandler(e: FormEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
    /*   setShowSearchPopup(true); */
  }

  // Lets get Notifications from store
  const notifications = useAppSelector((state) => state.data.notifications);

  return (
    <ItemsWrapper>
      <SearchInput
        key={"searchInput"}
        $active={showSearch}
        defaultValue={searchQuery}
        /*   onBlur={showSearchHandler} */
        onInput={searchQueryHandler}
      />

      <SearchIconWrapper>
        {inProgress ? <SpinnerIconSVG /> : <SearchIconSVG onClick={showSearchHandler} />}
      </SearchIconWrapper>

      <NotificationWrapper
        $highlight={!isEmpty(notifications)}
        data-count={notifications.length}
        onClick={notificationsHandler}
      >
        <NotificationIconSVG />
        {showNotifications && <Notifications data={notifications} onLeave={setShowNotifications} />}
      </NotificationWrapper>
    </ItemsWrapper>
  );
};

export default HeaderItems;
