import React, {
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import BottomSheetBase, {
  BottomSheetProps as BaseBottomSheetProps,
} from "@gorhom/bottom-sheet";
import { Modal, TouchableOpacity } from "react-native";

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

export type BottomSheetProps = BaseBottomSheetProps & {
  onClose?: () => void;
  children?: ReactNode;
  testID?: string;
};

export const BottomSheet = React.forwardRef(
  (
    { onClose, children, testID, ...props }: BottomSheetProps,
    ref: RefObject<BottomSheetRef>
  ) => {
    const [visible, setVisible] = useState(false);

    const bottomSheetRef = useRef<BottomSheetBase>();

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
      close: () => {
        setTimeout(() => setVisible(false), 300);
        bottomSheetRef?.current?.close();
      },
    }));

    const handleClose = () => {
      setVisible(false);
      bottomSheetRef?.current?.close();
      onClose && onClose();
    };

    return (
      <Modal transparent visible={visible} testID={testID}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            {
              flex: 1,

              backgroundColor: "#222222A1",
            },
          ]}
          testID={`${testID}-overlay`}
          onPress={onClose}
        >
          <BottomSheetBase
            ref={bottomSheetRef}
            enablePanDownToClose
            onClose={handleClose}
            {...props}
          >
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
              {children}
            </TouchableOpacity>
          </BottomSheetBase>
        </TouchableOpacity>
      </Modal>
    );
  }
);
