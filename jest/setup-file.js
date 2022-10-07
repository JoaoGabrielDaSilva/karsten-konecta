import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import "react-native-gesture-handler/jestSetup";

global.window = {};
global.window = global;

module.exports = "SvgMock";
module.exports.ReactComponent = "SvgMock";

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// jest.mock("react-native-reanimated", () => {
//   const Reanimated = require("react-native-reanimated/mock");

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      getState: () => ({
        routes: [],
        index: 0,
      }),
    }),
  };
});

jest.mock("@gorhom/bottom-sheet", () => {
  const react = require("react-native");
  return {
    __esModule: true,
    default: react.View,
    namedExport: {
      ...require("react-native-reanimated/mock"),
      ...jest.requireActual("@gorhom/bottom-sheet"),
      BottomSheetFlatList: react.FlatList,
    },
  };
});

jest.mock("react-native-reanimated", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-native-reanimated"),
  };
});
global.ReanimatedDataMock = {
  now: () => Date.now(),
};
