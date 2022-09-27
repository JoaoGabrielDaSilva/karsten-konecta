import React, { ReactNode, useMemo, useState } from "react";
import { SectionList, SectionListRenderItemInfo } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { VerifyAttendanceProducts } from "../../../domain/usecases/attendance/verify-attendance-products";
import { RootPrivateStackParamList } from "../../routes";
import {
  Container,
  EmptyListText,
  StyledButton,
  StyledListProduct,
  StyledSectionTitle,
} from "./styles";

import { Alert } from "../../components/alert/alert";
import { useTheme } from "styled-components/native";
import { Modal } from "../../components/modal/modal";
import { Toast } from "../../components/toast/toast";
import { useAttendanceStore } from "../../store/attendance";
import { useUserStore } from "../../store/user";
import { GetAttendance } from "../../../domain/usecases/attendance/get-attendance";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "AttendanceRefreshedProducts"
>;

type Props = NavigationProps & {
  verifyAttendanceProducts: VerifyAttendanceProducts;
  getAttendance: GetAttendance;
};

export const AttendanceRefreshedProducts = ({
  navigation: { goBack },
  route,
  verifyAttendanceProducts,
  getAttendance,
}: Props) => {
  const { refreshedProducts, removedProducts } = route.params;

  const [modal, setModal] = useState({
    visible: false,
  });
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const { id: attendanceId, setAttendance } = useAttendanceStore();
  const storeId = useUserStore((state) => state.store.id);

  const sections = useMemo(() => {
    return [
      {
        title: "Produtos Atualizados",
        data: refreshedProducts,
        ListEmptyComponent: (
          <EmptyListText>Nenhum item atualizado</EmptyListText>
        ),
      },
      {
        title: "Produtos Removidos",
        data: removedProducts,
        ListEmptyComponent: (
          <EmptyListText>Nenhum item atualizado</EmptyListText>
        ),
      },
    ];
  }, []);

  const refreshAttendance = async () => {
    try {
      setLoading(true);
      await verifyAttendanceProducts.execute({
        attendanceId,
        storeId,
        shouldSave: true,
      });

      const attendance = await getAttendance.get({ id: attendanceId, storeId });

      setAttendance({
        ...attendance,
        id: String(attendanceId),
      });
      goBack();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast({
        type: "error",
        title: "Erro!",
        message: error.response.data.ErrorMessage,
      });
      console.log(error);
    }
  };

  return (
    <Container>
      <Modal
        {...modal}
        title="Atenção!"
        text="Deseja atualizar o carrinho e remover os produtos?"
        cancelLabel="Não"
        cancel={goBack}
        confirmLabel="Sim"
        confirm={refreshAttendance}
      />
      <SectionList
        sections={sections}
        contentContainerStyle={{
          padding: theme.spacing.lg,
        }}
        stickySectionHeadersEnabled={false}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, section: { data }, index }) => (
          <StyledListProduct
            {...item}
            borderless={index === data.length - 1}
            removed={!item?.availableAmount}
          />
        )}
        ListHeaderComponent={
          <Alert type="warning">
            O carrinho foi atualizado conforme a disponibilidade de estoque.
            Verifique os itens do atendimento antes de finalizar.
          </Alert>
        }
        renderSectionHeader={({
          section: { title, data, ListEmptyComponent },
        }) => (
          <>
            <StyledSectionTitle>{title}</StyledSectionTitle>
            {data.length === 0 ? ListEmptyComponent : null}
          </>
        )}
      />
      <StyledButton
        text="Concluir"
        onPress={() => setModal({ visible: true })}
        loading={loading}
      />
    </Container>
  );
};
