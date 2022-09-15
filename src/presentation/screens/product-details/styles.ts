import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Footer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const AdditionalInfo = styled.View`
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.color.background.primary};

  margin-top: ${({ theme }) => theme.spacing.xxl}px;
`;
