import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { makeLogin } from "../../main/factories/pages/login-factory";

export type RootPublicStackParamList = {
  Login: undefined;
};

const Stack = createSharedElementStackNavigator<RootPublicStackParamList>();

export const PublicRoutes = () => <StackNavigator />;

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={makeLogin}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
