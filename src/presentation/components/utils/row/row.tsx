import { FlexAlignType, StyleProp, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import styles from "./styles";

type FlexJustifyType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | undefined;

type Props = {
  align?: FlexAlignType;
  justify?: FlexJustifyType;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  testID?: string;
};

export const Row = ({
  align = "flex-start",
  justify = "flex-start",
  style,
  children,
  ...props
}: Props) => {
  return (
    <Animated.View
      style={[
        style,
        styles.row,
        {
          alignItems: align,
          justifyContent: justify,
        },
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};
