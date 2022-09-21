import styled from "styled-components/native";
import { Row, SectionTitle } from "../../components/utils";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.color.background.secondary};

  justify-content: flex-end;
`;

export const StyledSectionTitle = styled(SectionTitle)`
  margin: ${({ theme }) => theme.spacing.lg}px;
`;

export const Categories = styled(Row)`
  padding: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.lg}px;

  background-color: ${({ theme }) => theme.color.background.primary};

  border: 0.5px solid transparent;
  border-bottom-color: ${({ theme }) => theme.color.unfocused};
`;
