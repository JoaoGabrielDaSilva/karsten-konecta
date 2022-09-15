import styled from "styled-components/native";
import { Typography } from "../../../../components/utils";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px 0px;

  border: 0.5px solid transparent;
  border-bottom-color: ${({ theme }) => theme.color.text.secondary};
`;

export const Col = styled.View``;

export const Name = styled(Typography)``;

export const Code = styled(Typography)`
  margin: ${({ theme }) => theme.spacing.md}px 0px;
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const Ean = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};
`;
