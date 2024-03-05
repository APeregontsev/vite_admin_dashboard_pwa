import { formMessage } from "common/SuccessMessage/SuccessMessage";
import { TypeOptions, toast } from "react-toastify";
import { addNotification } from "store/slices/data";
import { useAppDispatch } from "store/store";
import { useTheme } from "styled-components";

export const useNotify = () => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  function notify(message: string | JSX.Element, type: TypeOptions | undefined = "error", options: {} = {}) {
    // If message is JSX Element -> lets get text out of it
    const text = typeof message === "string" ? message : formMessage(message.props);

    dispatch(addNotification({ message: text, type }));

    toast(message, {
      type: type,
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
      theme: theme.darkMode ? "dark" : "light",
      ...options,
    });
  }

  return notify;
};

/// OLD NOTIFY

/* export const notify = (
  message: string | JSX.Element,
  type: TypeOptions | undefined = "error",
  options: {} = {}
) => {
  toast(message, {
    type: type,
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: false,
    progress: undefined,
    ...options,
  });
}; */
