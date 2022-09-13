import { StackScreenProps } from "@react-navigation/stack";

import { RootPrivateStackParamList } from "../../../presentation/routes";
import { Login } from "../../../presentation/screens/login/login";
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeRemoteGetUserData } from "../../usecases/user/remote-get-user-data-factory";

type Props = StackScreenProps<RootPrivateStackParamList, "Login">;

export const makeLogin = (props: Props) => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      getUserData={makeRemoteGetUserData()}
      {...props}
    />
  );
};
