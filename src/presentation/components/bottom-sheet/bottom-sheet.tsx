import React, { ReactNode, RefObject } from "react";
import BottomSheetBase, {
  BottomSheetFlatList,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { Modal, TouchableOpacity } from "react-native";

export type BottomSheetRef = BottomSheetBase;

type Props = BottomSheetProps & {
  visible?: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

export const BottomSheet = React.forwardRef(
  (
    { visible, onClose, children, ...props }: Props,
    ref: RefObject<BottomSheetRef>
  ) => {
    return (
      <Modal transparent visible={visible}>
        <BottomSheetBase
          ref={ref}
          detached
          enablePanDownToClose
          onClose={onClose}
          backdropComponent={() => (
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1, backgroundColor: "#222222A1" }}
              onPress={onClose}
            />
          )}
          {...props}
        >
          {children}
        </BottomSheetBase>
      </Modal>
    );
  }
);
