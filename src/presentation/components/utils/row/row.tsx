import Animated from "react-native-reanimated";
import { Flex, IFlexProps } from "native-base";

const Container = Animated.createAnimatedComponent(Flex);

export type RowProps = IFlexProps & {
  testID?: string;
};

export const Row = ({ children, ...props }: RowProps) => {
  return (
    <Container direction="row" {...props}>
      {children}
    </Container>
  );
};
