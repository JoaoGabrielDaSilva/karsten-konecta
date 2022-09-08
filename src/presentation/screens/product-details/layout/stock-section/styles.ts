import styled from "styled-components/native";
import { Typography } from "../../../../components";

export const Container = styled.View`
  padding-bottom: 0px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const SectionTitle = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-left: ${({ theme }) => theme.spacing.lg}px;
`;
