import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => theme.spacing.xxl}px
    ${({ theme }) => theme.spacing.md}px;

  border: 1.5px solid transparent;
  border-top-color: ${({ theme }) => theme.color.background.secondary};
`;
