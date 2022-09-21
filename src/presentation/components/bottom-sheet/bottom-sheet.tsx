import React, {
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import BottomSheetBase, { BottomSheetProps } from "@gorhom/bottom-sheet";
import { Modal, TouchableOpacity } from "react-native";

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

type Props = BottomSheetProps & {
  onClose?: () => void;
  children?: ReactNode;
};

export const BottomSheet = React.forwardRef(
  ({ onClose, children, ...props }: Props, ref: RefObject<BottomSheetRef>) => {
    const [visible, setVisible] = useState(false);

    const bottomSheetRef = useRef<BottomSheetBase>();

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
      close: () => {
        bottomSheetRef?.current?.close();
      },
    }));

    const handleClose = () => {
      setVisible(false);
      bottomSheetRef?.current?.close();
      onClose && onClose();
    };

    return (
      <Modal transparent visible={visible}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            {
              flex: 1,

              backgroundColor: "#222222A1",
            },
          ]}
          onPress={onClose}
        >
          <BottomSheetBase
            ref={bottomSheetRef}
            enablePanDownToClose
            onClose={handleClose}
            {...props}
          >
            {children}
          </BottomSheetBase>
        </TouchableOpacity>
      </Modal>
    );
  }
);
