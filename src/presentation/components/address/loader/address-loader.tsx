import React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import {
  Container,
  Title,
  Name,
  RadioButton,
  Value,
  Content,
  ArrowIcon,
  EditLabel,
} from "./styles";

type Props = {
  style?: StyleProp<ViewStyle>;
  borderless?: boolean;
  showRightArrow?: boolean;
  editable?: boolean;
  selectable?: boolean;
  isMain?: boolean;
};

const { width } = Dimensions.get("window");

export const AddressLoader = ({
  style,
  borderless,
  showRightArrow = true,
  editable,
  selectable,
  isMain,
}: Props) => {
  return (
    <Container
      style={style}
      justify="space-between"
      align={editable ? "flex-start" : "center"}
      borderless={borderless}
    >
      <Content>
        {isMain && <Title width={70} height={15} />}
        <Name width={50} height={15} />
        <Value width={width * 0.3} height={10} />
        <Value width={width * 0.1} height={10} />
        <Value width={width * 0.3} height={10} />
        <Value width={width * 0.25} height={10} />
        <Value width={width * 0.4} height={10} />
      </Content>
      {showRightArrow && !editable && !selectable && (
        <ArrowIcon name="chevron-right" />
      )}
      {editable ? <EditLabel>Alterar</EditLabel> : null}
      {selectable ? (
        <RadioButton width={25} height={25} borderRadius={25} />
      ) : null}
    </Container>
  );
};
