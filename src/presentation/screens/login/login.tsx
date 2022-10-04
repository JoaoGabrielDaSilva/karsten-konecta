import { useEffect, useState } from "react";
import { useForm, UseFormHandleSubmit } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { Authentication } from "../../../domain/usecases/authentication/authentication";
import { useUserStore } from "../../store/user";
import loginImage from "../../assets/images/login-image.jpg";
import karstenImage from "../../assets/images/karsten-logo.jpg";
import trussardiImage from "../../assets/images/trussardi-logo.jpg";

import {
  ActionsText,
  Container,
  Form,
  Image,
  RoundCornerTop,
  StyledRow,
  StyledTextInput,
  SubTitle,
  StyledButton,
  Title,
  LetteringImage,
  Divisor,
} from "./styles";
import { Row } from "../../components/utils";
import { Checkbox } from "../../components/form/checkbox/checkbox";
import {
  getLastLoggedInAccountAdapter,
  setLastLoggedInAccountAdapter,
} from "../../../main/adapters/last-logged-in-account-adapter";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeLoginSchema } from "./login-schema";
import { GetUserData } from "../../../domain/usecases/user/get-user-data";
import { GetStoreList } from "../../../domain/usecases/store/get-store-list";
import { Toast } from "../../components/toast/toast";

type FormValues = {
  login: string;
  password: string;
};

type Props = {
  authentication: Authentication;
  getUserData: GetUserData;
  getStoreList: GetStoreList;
};

export const Login = ({ authentication, getUserData, getStoreList }: Props) => {
  const { setUserData, setUserId } = useUserStore();

  const [loading, setLoading] = useState(false);

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(makeLoginSchema()),
  });

  const onSubmit = async ({ login, password }: FormValues) => {
    try {
      setLoading(true);
      const response = await authentication.auth({ login, password });

      setUserId({ id: response.userId });
      setLastLoggedInAccountAdapter({ login, password });

      const userData = await getUserData.execute();
      const { storeList } = await getStoreList.execute({ page: 0 });

      const firstFoundStore = storeList[0];

      setUserData({ ...userData, logged: true, store: firstFoundStore });

      setLoading(false);
    } catch (error) {
      Toast({ title: "Erro!", message: error.message, type: "error" });
      console.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLastLoggedInAccountAdapter().then((data) => data && reset(data));
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Container>
        <Image source={loginImage} resizeMode="cover">
          <RoundCornerTop />
        </Image>
        <Form>
          <Row justify="center" align="center">
            <LetteringImage source={karstenImage} />
            <Divisor />
            <LetteringImage source={trussardiImage} />
          </Row>
          <Title bold variant="heading">
            Bem-Vindo!
          </Title>
          <SubTitle semibold>Faça Login em sua conta</SubTitle>
          <StyledTextInput
            testID="email-field"
            name="login"
            placeholder="E-mail"
            control={control}
            editable={!loading}
          />
          <StyledTextInput
            testID="password-field"
            name="password"
            placeholder="Senha"
            control={control}
            editable={!loading}
          />
          <StyledButton
            text="Login"
            testID="submit-button"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
          <StyledRow justify="space-between">
            <ActionsText>Esqueci minha senha</ActionsText>
            <ActionsText>Esqueci minha senha</ActionsText>
          </StyledRow>
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
};
