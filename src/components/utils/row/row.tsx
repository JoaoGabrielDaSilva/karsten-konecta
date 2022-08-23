import { FlexAlignType, StyleProp, View, ViewStyle } from "react-native";
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
};

export const Row = ({
  align = "flex-start",
  justify = "flex-start",
  style,
  children,
}: Props) => {
  return (
    <View
      style={[
        style,
        styles.row,
        {
          alignItems: align,
          justifyContent: justify,
        },
      ]}
    >
      {children}
    </View>
  );
};
