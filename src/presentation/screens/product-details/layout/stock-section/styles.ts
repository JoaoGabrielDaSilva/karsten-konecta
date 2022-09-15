import styled from "styled-components/native";
import { Typography } from "../../../../components/utils";

export const Container = styled.View`
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const SectionTitle = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;
