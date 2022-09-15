import styled from "styled-components/native";
import { TextInput } from "../../components/form/text-input/text-input";
import { ImageBackground, Image as RNImage } from "react-native";

import { Row, Typography } from "../../components/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { Button } from "../../components/buttons/button/button";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};

  justify-content: flex-end;
`;

export const Image = styled(ImageBackground)`
  width: 100%;
  flex: 1;

  justify-content: flex-end;
`;

export const RoundCornerTop = styled.View`
  height: 20px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border-top-left-radius: ${({ theme }) => theme.radii.md}px;
  border-top-right-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Form = styled.View`
  min-height: 60%;

  padding: ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};
`;

export const StyledTextInput = styled(TextInput)`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.xxl}px;
`;

export const Title = styled(Typography)`
  text-align: center;

  margin-top: ${({ theme }) => theme.spacing.xxl}px;

  font-size: ${({ theme }) => RFValue(theme.fontSize.xxl)}px;
`;

export const SubTitle = styled(Typography)`
  text-align: center;

  font-size: ${({ theme }) => RFValue(theme.fontSize.lg)}px;
  font-weight: bold;

  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

export const ActionsText = styled(Typography)`
  color: ${({ theme }) => theme.color.text.secondary};
`;

export const StyledRow = styled(Row)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const Divisor = styled.View`
  width: 1px;
  height: 25px;

  background-color: ${({ theme }) => theme.color.background.inverted};

  margin: 0px ${({ theme }) => theme.spacing.xxl}px;
`;

export const LetteringImage = styled(RNImage)``;
