import styled from "styled-components/native";
import { Row } from "../../utils";

export const Container = styled(Row)`
  width: 100%;

  background-color: ${({ theme }) => theme.color.background.primary};
  padding: ${({ theme }) => `${theme.spacing.xl}px 0px`};
`;
