import { MaterialCommunityIcons } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { DrawerActions } from "@react-navigation/native";
import {
  fireEvent,
  renderHook,
  RenderResult,
} from "@testing-library/react-native";
import { Control, useForm } from "react-hook-form";
import {
  StackSearchNavbar,
  StackSearchNavbarProps,
} from "../../../../src/presentation/components/navigation/search-navbar/search-navbar";

import { renderWithProviders } from "../../mocks/app.provider";
import { mockNavigationProps } from "../../mocks/navigation-prop";

const mockedOpenDrawer = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");

  return {
    ...actualNav,
    DrawerActions: {
      openDrawer: () => mockedOpenDrawer(),
    },
  };
});

type SutTypes = {
  sut: RenderResult;
  data: Partial<StackSearchNavbarProps>;
};

type SutParams = Partial<StackSearchNavbarProps> & {
  control: Control<{ search: string }, "search">;
};

const mockProps = (): Omit<StackSearchNavbarProps, "control"> => ({
  navigation: mockNavigationProps().navigation,
});

const makeSut = (props: SutParams): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <StackSearchNavbar {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("StackSearchNavbar", () => {
  afterEach(() => mockedOpenDrawer.mockClear());

  it("should toggle drawer", async () => {
    const { result } = renderHook(() => useForm<{ search: string }>());

    const { sut } = makeSut({
      control: result.current.control,
      drawer: true,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        name: "menu",
      })
    );

    expect(mockedOpenDrawer).toHaveBeenCalledTimes(1);
  });
  it("should show right icon", async () => {
    const { result } = renderHook(() => useForm<{ search: string }>());
    const rightIcon: keyof typeof MaterialCommunityIcons.glyphMap = "file";

    const onRightIconPress = jest.fn();

    const { sut } = makeSut({
      control: result.current.control,
      rightIcon,
      onRightIconPress,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        name: rightIcon,
      })
    );

    expect(onRightIconPress).toHaveBeenCalledTimes(1);
  });
  it("should left icon", async () => {
    const { result } = renderHook(() => useForm<{ search: string }>());

    const onLeftIconPress = jest.fn();
    const headerLeftIcon: keyof typeof MaterialCommunityIcons.glyphMap = "file";

    const { sut } = makeSut({
      control: result.current.control,
      headerLeftIcon,
      onLeftIconPress,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        name: headerLeftIcon,
      })
    );
    expect(onLeftIconPress).toHaveBeenCalledTimes(1);
  });
  it("should show back arrow", async () => {
    const { result } = renderHook(() => useForm<{ search: string }>());

    const goBack = jest.fn();

    const { sut } = makeSut({
      control: result.current.control,
      navigation: {
        ...mockNavigationProps().navigation,
        goBack,
        canGoBack: () => true,
      },
      backArrow: true,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        name: "chevron-left",
      })
    );
    expect(goBack).toHaveBeenCalledTimes(1);
  });
  it("should call onFocus", async () => {
    const { result } = renderHook(() => useForm<{ search: string }>());

    const onFocus = jest.fn();

    const { sut } = makeSut({
      control: result.current.control,
      onFocus,
    });

    fireEvent(sut.getByPlaceholderText("Buscar produtos..."), "focus");
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
  it("should call onBlur", async () => {
    const { result } = renderHook(() => useForm<{ search: string }>());

    const onBlur = jest.fn();

    const { sut } = makeSut({
      control: result.current.control,
      onBlur,
    });

    const input = sut.getByPlaceholderText("Buscar produtos...");

    fireEvent(input, "focus");
    fireEvent(input, "blur");
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
  it("should have autofocus true", async () => {
    const { result } = renderHook(() => useForm<{ search: string }>());

    const { sut } = makeSut({
      control: result.current.control,
      defaultFocus: true,
    });

    expect(sut.getByPlaceholderText("Buscar produtos...").props.autoFocus).toBe(
      true
    );
  });
  it("should call submit", async () => {
    const { result } = renderHook(() => useForm<{ search: string }>());

    const handleSubmit = jest.fn();
    const text = faker.random.words();

    const { sut } = makeSut({
      control: result.current.control,
      handleSubmit,
    });

    const input = sut.getByPlaceholderText("Buscar produtos...");

    fireEvent.changeText(input, text);

    fireEvent(input, "submitEditing");

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
