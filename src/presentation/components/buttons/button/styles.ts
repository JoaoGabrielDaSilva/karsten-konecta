import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

export const Container = styled(Row).attrs(() => ({
  align: "center",
  justify: "center",
}))<{ disabled: boolean }>`
  padding: ${({ theme }) => theme.spacing.md}px;

  background-color: ${({ theme }) => theme.color.background.emphasis};
  opacity: ${({ disabled }) => (!disabled ? 1 : 0.5)};

  border-radius: ${({ theme }) => theme.radii.sm}px;
`;

export const Text = styled(Typography).attrs(() => ({
  bold: true,
}))`
  color: ${({ theme }) => theme.color.text.inverted};
`;
