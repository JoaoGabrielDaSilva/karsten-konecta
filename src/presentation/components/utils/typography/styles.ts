import { RFValue } from "react-native-responsive-fontsize";
import styled, { DefaultTheme } from "styled-components/native";
import { TextAlign, TypographyVariant } from "..";

const fontSizeDictionary = (
  theme: DefaultTheme,
  variant: TypographyVariant
) => {
  switch (variant) {
    case "heading":
      return theme.fontSize.lg;
    case "subtitle":
      return theme.fontSize.md;
    case "text":
      return theme.fontSize.sm;
  }
};

export const Text = styled.Text<{
  variant?: TypographyVariant;
  textAlign?: TextAlign;
  bold?: boolean;
  semibold?: boolean;
}>`
  font-size: ${({ theme, variant }) =>
    RFValue(fontSizeDictionary(theme, variant))}px;
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ theme }) => theme.color.text.primary};
  font-weight: ${({ bold, semibold }) =>
    bold ? "bold" : semibold ? "500" : "normal"};
`;
