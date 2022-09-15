import styled from "styled-components/native";
import { Row, Typography } from "../../utils";
import { Variant } from "./radio-button";

const ITEM_SIZE = {
  default: 25,
  small: 20,
};

export const Container = styled.View<{ variant: Variant }>`
  width: ${({ variant }) => ITEM_SIZE[variant]}px;
  height: ${({ variant }) => ITEM_SIZE[variant]}px;

  border: 1px solid ${({ theme }) => theme.color.background.emphasis};
  border-radius: ${({ variant }) => ITEM_SIZE[variant]}px;

  padding: ${({ theme }) => theme.spacing.sm}px;

  align-items: center;
  justify-content: center;
`;

export const Label = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

export const Fill = styled.View<{ variant: Variant }>`
  width: ${({ variant }) => ITEM_SIZE[variant] - 10}px;
  height: ${({ variant }) => ITEM_SIZE[variant] - 10}px;

  background-color: ${({ theme }) => theme.color.background.emphasis};
  border-radius: ${({ variant }) => ITEM_SIZE[variant]}px;
`;

export const StyledRow = styled(Row)<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
