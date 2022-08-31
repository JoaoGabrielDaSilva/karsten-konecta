import styled from "styled-components/native";
import { Typography } from "../../utils";

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.color.red[500]};
`;
