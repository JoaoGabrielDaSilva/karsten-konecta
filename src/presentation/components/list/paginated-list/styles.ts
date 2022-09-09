import styled from "styled-components/native";
import { Typography } from "../..";
import { Skeleton } from "../../skeleton/skeleton";
import { RFValue } from "react-native-responsive-fontsize";

export const TotalResults = styled(Typography)`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.lg}px 0px;

  font-size: ${({ theme }) => RFValue(theme.fontSize.md)}px;

  color: ${({ theme }) => theme.color.text.secondary};
`;

export const TotalResultsLoader = styled(Skeleton)`
  align-self: center;

  margin: ${({ theme }) => theme.spacing.lg}px 0px;
`;
