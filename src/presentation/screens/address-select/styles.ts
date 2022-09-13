import styled from "styled-components/native";
import { Address } from "../../components/address/address";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const StyledAddress = styled(Address)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;
