import { createStackNavigator } from "@react-navigation/stack";
import { EmailList } from "../screens/EmailList/EmailList";

export type RootPrivateStackParamList = {
  EmailList: undefined;
};

const Stack = createStackNavigator<RootPrivateStackParamList>();

export const PrivateRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EmailList" component={EmailList} />
    </Stack.Navigator>
  );
};
