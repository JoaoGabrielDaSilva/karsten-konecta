import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Row } from "../../../../components/utils";
import { Skeleton } from "../../../../components/skeleton/skeleton";
import { RootPrivateStackParamList } from "../../../../routes";
import { RootPublicStackParamList } from "../../../../routes/public-routes";
import { useAttendanceStore } from "../../../../store/attendance";
import {
  AttendanceName,
  Container,
  CustomerActionLabel,
  UserIcon,
} from "./styles";

const { width } = Dimensions.get("window");

type Props = {
  loading: boolean;
};

export const AttendanceHeader = ({ loading }: Props) => {
  const { name } = useAttendanceStore();

  const { navigate } =
    useNavigation<
      StackNavigationProp<RootPrivateStackParamList, "Attendance", undefined>
    >();

  return (
    <Container align="center" justify="space-between">
      <Row align="center">
        <UserIcon name="user" />
        {!loading ? (
          <AttendanceName semibold>{name}</AttendanceName>
        ) : (
          <Skeleton width={width * 0.3} height={15} />
        )}
      </Row>
      <RectButton onPress={() => navigate("CustomerRegister")}>
        {!loading ? (
          <CustomerActionLabel semibold>
            {name ? "Editar" : "Finalizar"}
          </CustomerActionLabel>
        ) : (
          <Skeleton width={60} height={15} />
        )}
      </RectButton>
    </Container>
  );
};
