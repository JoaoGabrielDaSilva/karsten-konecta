import { Dimensions, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Row, Typography } from "../../utils";

const { width } = Dimensions.get("window");

const PROFILE_PICTURE_SIZE = width * 0.18;

export const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px 0px;

  border: 0.5px solid transparent;
  border-bottom-color: ${({ theme }) => theme.color.text.secondary};
`;

export const TopSide = styled(Row)``;

export const ActionContainer = styled.View``;

export const ProfilePicture = styled(Image)`
  width: ${PROFILE_PICTURE_SIZE}px;
  height: ${PROFILE_PICTURE_SIZE}px;

  border-radius: ${PROFILE_PICTURE_SIZE}px;
`;

export const Info = styled.View`
  padding: 0px ${({ theme }) => theme.spacing.lg}px;
`;

export const Email = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;

  font-size: ${RFPercentage(1.5)}px;
`;
