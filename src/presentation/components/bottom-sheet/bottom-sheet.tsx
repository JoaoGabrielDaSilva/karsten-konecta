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

    return (
      <Modal transparent visible={visible}>
        <BottomSheetBase
          ref={bottomSheetRef}
          detached
          enablePanDownToClose
          onClose={() => setVisible(false)}
          backdropComponent={() => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  {
                    flex: 1,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#222222A1",
                  },
                ]}
                onPress={onClose}
              />
            );
          }}
          {...props}
        >
          {children}
        </BottomSheetBase>
      </Modal>
    );
  }
);
