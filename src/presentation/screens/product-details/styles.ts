import styled from "styled-components/native";
import { Skeleton } from "../../components/skeleton/skeleton";
import { SectionTitle } from "../../components/utils";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Footer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const AdditionalInfo = styled.View`
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.color.background.primary};

  margin-top: ${({ theme }) => theme.spacing.xxl}px;
`;

export const AdditionalInfoLoader = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  margin-top: ${({ theme }) => theme.spacing.xxl}px;
`;

export const SuggestedProductsTitle = styled(SectionTitle)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;

export const SuggestedProductsTitleLoader = styled(Skeleton)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;
