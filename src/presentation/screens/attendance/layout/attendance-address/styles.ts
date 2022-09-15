import styled from "styled-components/native";
import { Address } from "../../../../components/address/address";
import { AddressLoader } from "../../../../components/address/loader/address-loader";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { ShippingInfoLoader } from "../../../../components/shipping-info/loader/shipping-info-loader";
import { ShippingInfo } from "../../../../components/shipping-info/shipping-info";
import { SectionTitle } from "../../../../components/utils";

export const Form = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledTextInput = styled(TextInput)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;
export const StyledSectionTitle = styled(SectionTitle)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledAddress = styled(Address)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledShippingInfo = styled(ShippingInfo)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledAddressLoader = styled(AddressLoader)`
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledShippingInfoLoader = styled(ShippingInfoLoader)`
  padding-right: ${({ theme }) => theme.spacing.lg}px;
  padding-left: ${({ theme }) => theme.spacing.lg}px;
`;

export const DeliveryModeContainer = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;
`;
