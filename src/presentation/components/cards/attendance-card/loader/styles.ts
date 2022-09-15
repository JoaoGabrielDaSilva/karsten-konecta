import styled from "styled-components/native";
import { Button } from "../../../buttons/button/button";
import { Skeleton } from "../../../skeleton/skeleton";
import { Row } from "../../../utils";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};

  padding: ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.lg}px;

  border-radius: ${({ theme }) => theme.radii.md}px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Name = styled(Skeleton)``;

export const Value = styled(Skeleton)`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;
