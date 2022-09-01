import styled from "styled-components/native";
import { SectionTitle } from "../../../../components/utils/section-title/section-title";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  margin-top: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const Title = styled(SectionTitle)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;
