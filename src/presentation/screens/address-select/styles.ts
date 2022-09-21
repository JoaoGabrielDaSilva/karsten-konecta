import styled from "styled-components/native";
import { Address } from "../../components/address/address";
import { AddressLoader } from "../../components/address/loader/address-loader";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const StyledAddress = styled(Address)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const StyledAddressLoader = styled(AddressLoader)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;
