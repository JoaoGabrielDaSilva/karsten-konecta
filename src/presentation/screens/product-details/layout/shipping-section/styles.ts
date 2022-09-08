import styled from "styled-components/native";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { Skeleton } from "../../../../components/skeleton/skeleton";
import { SectionTitle } from "../../../../components/utils/section-title/section-title";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.background.primary};

  margin-top: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledTextInput = styled(TextInput)`
  margin: ${({ theme }) => theme.spacing.lg}px 0px;
`;

export const Title = styled(SectionTitle)``;
