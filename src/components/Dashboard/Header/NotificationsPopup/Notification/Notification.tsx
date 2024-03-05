import { FC } from "react";
import { NotificationType } from "store/slices/types";
import { NotificationClose, NotificationIcon, NotificationText, NotificationWrapper } from "./style";
import { SuccessIcon, CloserIcon, ErrorIcon } from "../Icons/notificationsIcons";
import { useAppDispatch } from "store/store";
import { deleteNotification } from "store/slices/data";

type NotificationsProps = { item: NotificationType };

const Notifications: FC<NotificationsProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  function deleteNotificationHandler() {
    dispatch(deleteNotification(item.id));
  }

  return (
    <NotificationWrapper>
      <NotificationIcon>
        {item.type === "success" && <SuccessIcon />}
        {item.type === "error" && <ErrorIcon />}
      </NotificationIcon>
      <NotificationText>{item.message}</NotificationText>
      <NotificationClose>
        <CloserIcon onClick={deleteNotificationHandler} />
      </NotificationClose>
    </NotificationWrapper>
  );
};

export default Notifications;
