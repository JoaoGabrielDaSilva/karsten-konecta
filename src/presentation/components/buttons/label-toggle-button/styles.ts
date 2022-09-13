import styled, { css } from "styled-components/native";
import { Row, Typography } from "../../utils";

const leftSideButtonStyle = css<{ active?: boolean }>`
  border-bottom-left-radius: ${({ theme }) => theme.radii.sm}px;
  border-top-left-radius: ${({ theme }) => theme.radii.sm}px;

  border-right-width: ${({ active }) => (active ? 1 : 0)}px;
`;

const rightSideButtonStyle = css<{ active?: boolean }>`
  border-bottom-right-radius: ${({ theme }) => theme.radii.sm}px;
  border-top-right-radius: ${({ theme }) => theme.radii.sm}px;

  border-left-width: ${({ active }) => (active ? 1 : 0)}px;
`;

export const Container = styled(Row)`
  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Button = styled.Pressable<{
  active?: boolean;
  leftSide?: boolean;
}>`
  flex: 1;
  background-color: ${({ theme, active }) =>
    active ? "#f2f8fc" : theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.lg}px;

  border: 1px solid
    ${({ theme, active }) => (active ? "#107ec6" : theme.color.unfocused)};

  ${({ leftSide }) => (leftSide ? leftSideButtonStyle : rightSideButtonStyle)}
`;

export const Label = styled(Typography)<{ active?: boolean }>`
  text-align: center;

  color: ${({ theme, active }) =>
    active ? "#107ec6" : theme.color.text.secondary};
`;
