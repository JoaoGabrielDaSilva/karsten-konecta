import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MakeNewAttendance } from "../../../main/factories/pages/new-attendance.factory";

export type AttendanceStackParamList = {
  NewAttendance: undefined;
  NewNoCustomerAttendance: undefined;
};

const Stack = createNativeStackNavigator<AttendanceStackParamList>();

export const AttendanceStack = () => (
  <Stack.Navigator
    initialRouteName="NewAttendance"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="NewAttendance" component={MakeNewAttendance} />
    {/* <Stack.Screen
      name="NewNoCustomerAttendance"
      getComponent={() =>
        require("../../../main/factories/pages/new-no-customer-attendance-factory")
          .default
      }
    /> */}
  </Stack.Navigator>
);
