import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { RootPrivateStackParamList } from "../../routes";
import { useForm } from "react-hook-form";
import {
  Container,
  Footer,
  Form,
  StyledButton,
  StyledTextInput,
} from "./styles";
import { ScrollView } from "react-native";
import { TextInput } from "../../components/form/text-input/text-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerSearchSchema } from "./schema";
import { BottomTab } from "../../components/navigation/bottom-tab/bottom-tab";
import { GetActionCustomerDetails } from "../../../domain/usecases/action/get-action-customer-details";
import { useUserStore } from "../../store/user";
import { Toast } from "../../components/toast/toast";
import { useCustomerListFiltersStore } from "../../store/customer-search-filters";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "CustomerSearch"
>;

type Props = NavigationProps & {
  getCustomer: GetActionCustomerDetails;
};

type FormValues = {
  name: string;
  cpfCnpj: string;
  email: string;
};

export const CustomerSearch = ({
  navigation: { navigate },
  getCustomer,
}: Props) => {
  const { store } = useUserStore();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(customerSearchSchema),
  });

  const { setFilters } = useCustomerListFiltersStore();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      if (data?.cpfCnpj) {
        setLoading(true);
        const customer = await getCustomer.execute({
          storeId: store.id,
          cpfCnpj: data.cpfCnpj,
        });

        reset();
        navigate("Customer360", {
          customer,
        });

        setLoading(false);
        return;
      }

      const nameFilter = data?.name
        ? {
            label: "Nome",
            key: "name",
            value: data?.name,
            apiValue: data?.name,
          }
        : null;
      const emailFilter = data?.email
        ? {
            label: "E-mail",
            key: "email",
            value: data?.email,
            apiValue: data?.email,
          }
        : null;

      setFilters({
        name: nameFilter,
        email: emailFilter,
      });

      reset();
      navigate("CustomerList");
    } catch (error) {
      Toast({
        type: "error",
        title: "Erro!",
        message: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
      >
        <Form>
          <StyledTextInput
            control={control}
            name="name"
            placeholder="Nome"
            editable={!loading}
          />
          <StyledTextInput
            control={control}
            name="cpfCnpj"
            placeholder="CPF/CNPJ"
            mask="cpfCnpj"
            editable={!loading}
          />
          <StyledTextInput
            control={control}
            name="email"
            placeholder="E-mail"
            editable={!loading}
          />
        </Form>
      </ScrollView>
      <Footer>
        <StyledButton
          text="Buscar"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
      </Footer>
      <BottomTab />
    </Container>
  );
};
