import { FC, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { CloseAll, InnerContainer, NoNotifications, NotificationsWrapper } from "./style";
import { NotificationType } from "store/slices/types";
import Notification from "./Notification";
import { useAppDispatch } from "store/store";
import { clearNotifications } from "store/slices/data";
import { useOutsideClick } from "hooks/useOutsideClick";

type NotificationsProps = { data: NotificationType[]; onLeave: (val: boolean) => void };

const Notifications: FC<NotificationsProps> = ({ data, onLeave }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onLeave);

  function deleteAllHandler() {
    dispatch(clearNotifications());
  }
  return (
    <NotificationsWrapper onClick={(e) => e.stopPropagation()} ref={ref}>
      <InnerContainer>
        {data.map((item) => (
          <Notification item={item} key={item.id} />
        ))}

        {isEmpty(data) && <NoNotifications>No notifications</NoNotifications>}
      </InnerContainer>

      {!isEmpty(data) && <CloseAll onClick={deleteAllHandler}>Close all</CloseAll>}
    </NotificationsWrapper>
  );
};

export default Notifications;
