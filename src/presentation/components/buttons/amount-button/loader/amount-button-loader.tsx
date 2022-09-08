import { Dimensions } from "react-native";
import { useTheme } from "styled-components/native";
import { Row } from "../../../utils";

import { Button, Amount } from "./styles";

const { width } = Dimensions.get("window");

export const AmountButtonLoader = () => {
  const theme = useTheme();

  return (
    <Row align="center">
      <Button
        width={width * 0.06}
        height={width * 0.06}
        borderRadius={theme.radii.sm}
      />
      <Amount
        width={width * 0.08}
        height={width * 0.08}
        borderRadius={theme.radii.sm}
      />
      <Button
        width={width * 0.06}
        height={width * 0.06}
        borderRadius={theme.radii.sm}
      />
    </Row>
  );
};
