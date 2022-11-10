import React, {
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { useSharedValue } from "react-native-reanimated";

export type BottomSheetProps = BottomSheetModalProps & {
  children?: ReactNode;
  testID?: string;
};

export const BottomSheet = React.forwardRef(
  (
    { children, testID, ...props }: BottomSheetProps,
    ref: RefObject<BottomSheetModal>
  ) => {
    return (
      <BottomSheetModal
        ref={ref}
        {...props}
        enableDismissOnClose
        detached
        backdropComponent={(props) => (
          <BottomSheetBackdrop disappearsOnIndex={-1} {...props} />
        )}
      >
        {children}
      </BottomSheetModal>
    );
  }
);
