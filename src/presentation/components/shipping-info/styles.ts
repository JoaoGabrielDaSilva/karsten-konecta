import styled from "styled-components/native";
import { Typography } from "../utils";

export const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const Label = styled(Typography).attrs(() => ({
  semibold: true,
}))``;

export const Value = styled(Typography)`
  margin: ${({ theme }) => theme.spacing.sm}px 0px;
  color: ${({ theme }) => theme.color.text.secondary};
`;
