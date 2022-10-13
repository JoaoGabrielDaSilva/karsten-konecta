import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import "react-native-gesture-handler/jestSetup";
import mockBackHandler from "react-native/Libraries/Utilities/__mocks__/BackHandler.js";

global.window = {};
global.window = global;

module.exports = "SvgMock";
module.exports.ReactComponent = "SvgMock";

jest.mock("react-native-toast-message", () => {
  const RealComponent = jest.requireActual("react-native-toast-message");
  const ReactInternal = require("react");
  class Toast extends ReactInternal.Component {
    static show = jest.fn();
    static hide = jest.fn();

    render() {
      return ReactInternal.createElement(
        "Toast",
        this.props,
        this.props.children
      );
    }
  }
  Toast.propTypes = RealComponent.propTypes;
  return Toast;
});

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

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

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      getState: () => ({
        routes: [],
        index: 0,
      }),
      reset: jest.fn(),
    }),
  };
});

jest.mock("zustand");
