import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { TextAlign, TypographyVariant } from "../..";

const fontSizeDictionary = (theme) => ({
  heading: theme.fontSize.md,
  paragraph: theme.fontSize.sm,
  text: theme.fontSize.sm,
});

export const Text = styled.Text<{
  variant?: TypographyVariant;
  textAlign?: TextAlign;
}>`
  font-size: ${({ theme, variant }) =>
    RFValue(fontSizeDictionary(theme)[variant])}px;
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ theme }) => theme.color.text.primary};
`;
