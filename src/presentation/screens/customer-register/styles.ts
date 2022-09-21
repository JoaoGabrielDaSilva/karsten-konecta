import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../../components/utils";
import { Checkbox } from "../../components/form/checkbox/checkbox";
import { TextInput } from "../../components/form/text-input/text-input";
import { SectionTitle } from "../../components/utils/section-title/section-title";
import { Address } from "../../components/address/address";
import { AddressLoader } from "../../components/address/loader/address-loader";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};
`;

export const Form = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
`;

export const AddressContainer = styled.View``;

export const CustomTextInput = styled(TextInput)`
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const StyledSectionTitle = styled(SectionTitle)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledRow = styled(Row)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const AddIcon = styled(MaterialIcons)`
  font-size: ${({ theme }) => RFValue(theme.fontSize.xl)}px;
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const NoAddressFound = styled(Typography)`
  text-align: center;

  color: ${({ theme }) => theme.color.text.secondary};

  margin-bottom: ${({ theme }) => theme.spacing.lg}px;

  font-size: ${({ theme }) => RFValue(theme.fontSize.md)}px;
`;

export const StyledAddress = styled(Address)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledAddressLoader = styled(AddressLoader)`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;
