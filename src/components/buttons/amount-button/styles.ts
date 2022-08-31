import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

const { width } = Dimensions.get("window");

const SMALL_ITEM_SIZE = width * 0.06;
const BIG_ITEM_SIZE = width * 0.08;

export const Container = styled(Row)``;

export const ButtonContainer = styled.View<{ centerOne: boolean }>`
  width: ${({ centerOne }) => (centerOne ? BIG_ITEM_SIZE : SMALL_ITEM_SIZE)}px;
  height: ${({ centerOne }) => (centerOne ? BIG_ITEM_SIZE : SMALL_ITEM_SIZE)}px;

  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.color.background.secondary};

  border-radius: ${({ theme }) => theme.spacing.sm}px;

  margin: 0px ${({ theme, centerOne }) => (centerOne ? theme.spacing.md : 0)}px;
`;

export const Text = styled(Typography)<{
  disabled: boolean;
  centerOne: boolean;
}>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.color.text.secondary : theme.color.text.primary};

  font-weight: ${({ centerOne }) => (centerOne ? "700" : "normal")};
`;
