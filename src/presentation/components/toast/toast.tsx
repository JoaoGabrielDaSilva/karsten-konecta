import RNToast from "react-native-toast-message";

type ToastType = "error" | "success";

export type ToastProps = {
  type: ToastType;
  title?: string;
  message?: string;
  duration?: 3000;
};

export const Toast = ({
  type,
  title,
  message,
  duration = 3000,
}: ToastProps) => {
  return RNToast.show({
    type,
    text1: title,
    text2: message,
    topOffset: 70,
    visibilityTime: duration,
  });
};
