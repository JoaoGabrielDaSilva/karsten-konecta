import styled from "styled-components/native";
import { Row } from "../../../../components";

export const Container = styled(Row)`
  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => theme.spacing.xxl}px
    ${({ theme }) => theme.spacing.md}px;

  border: 1.5px solid transparent;
  border-top-color: ${({ theme }) => theme.color.background.secondary};
`;
