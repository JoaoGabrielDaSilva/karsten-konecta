import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;
export const Footer = styled.View`
  border: 1px solid transparent;

  border-top-color: ${({ theme }) => theme.color.unfocused};

  border-radius: ${({ theme }) => theme.radii.md}px;

  padding: ${({ theme }) => theme.spacing.xxl}px;
  padding-top: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;
