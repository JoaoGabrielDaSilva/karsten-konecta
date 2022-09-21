import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Dimensions, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Row } from "../../../../components/utils";
import { Skeleton } from "../../../../components/skeleton/skeleton";
import { RootPrivateStackParamList } from "../../../../routes";
import { useAttendanceStore } from "../../../../store/attendance";
import {
  AttendanceDocument,
  AttendanceName,
  Container,
  CustomerActionLabel,
  DocumentLoader,
  UserIcon,
} from "./styles";
import { useCustomerStore } from "../../../../store/customer";
import { cnpjMask } from "../../../../utils/mask/cnpj-mask";
import { cpfMask } from "../../../../utils/mask/cpf-mask";

const { width } = Dimensions.get("window");

type Props = {
  loading: boolean;
};

export const AttendanceHeader = ({ loading }: Props) => {
  const { name, cpfCnpj: attendanceCpfCnpj } = useAttendanceStore();
  const { data: customer } = useCustomerStore();

  const { navigate } =
    useNavigation<
      StackNavigationProp<RootPrivateStackParamList, "Attendance", undefined>
    >();

  const document = customer?.cpfCnpj || attendanceCpfCnpj;

  return (
    <Container align="center" justify="space-between">
      <Row align="center">
        <UserIcon name="user" />
        <View>
          {!loading ? (
            <>
              <AttendanceName semibold>{name}</AttendanceName>
              {document ? (
                <AttendanceDocument>
                  {document.length <= 11
                    ? cpfMask(document)
                    : cnpjMask(document)}
                </AttendanceDocument>
              ) : null}
            </>
          ) : (
            <>
              <Skeleton width={width * 0.3} height={15} />
              <DocumentLoader width={width * 0.25} height={12} />
            </>
          )}
        </View>
      </Row>
      <RectButton onPress={() => navigate("CustomerRegister")}>
        {!loading ? (
          <CustomerActionLabel semibold>
            {customer?.id ? "Editar" : "Finalizar cadastro"}
          </CustomerActionLabel>
        ) : (
          <Skeleton width={60} height={15} />
        )}
      </RectButton>
    </Container>
  );
};
