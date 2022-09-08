import RNToast, { ToastShowParams } from "react-native-toast-message";

type ToastType = "error" | "success";

type Props = {
  type: ToastType;
  title?: string;
  message?: string;
  duration?: 3000;
};

export const Toast = ({ type, title, message, duration }: Props) => {
  return RNToast.show({
    type,
    text1: title,
    text2: message,
    topOffset: 70,
    visibilityTime: duration,
  });
};
