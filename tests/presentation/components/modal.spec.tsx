import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";

import {
  Modal,
  ModalProps,
} from "../../../src/presentation/components/modal/modal";

import { renderWithProviders } from "../mocks/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: ModalProps;
};

const mockProps = (): ModalProps => ({
  title: faker.random.word(),
  text: faker.random.words(),
  testID: faker.random.numeric(5),
});

const makeSut = (props?: Partial<ModalProps>): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <Modal {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("Modal", () => {
  it("should be open and display its childrens", async () => {
    const { sut, data } = makeSut({
      visible: true,
    });

    expect(sut.getByTestId(data.testID).props.visible).toBe(true);

    sut.getByText(data.text);
    sut.getByText(data.title);
  });
  it("should call the right callback on press overlay", async () => {
    const onPressOverlay = jest.fn();
    const { sut, data } = makeSut({
      visible: true,
      onPressOverlay,
    });

    fireEvent.press(sut.getByTestId(`${data.testID}-overlay`));

    expect(onPressOverlay).toHaveBeenCalledTimes(1);
  });
  it("should display ok button and call its callback", async () => {
    const ok = jest.fn();

    const { sut } = makeSut({
      visible: true,
      ok,
    });

    fireEvent.press(sut.getByText(/ok/i));

    expect(ok).toHaveBeenCalledTimes(1);
  });
  it("should display cancel button and call its callback", async () => {
    const cancel = jest.fn();

    const { sut } = makeSut({
      visible: true,
      cancel,
    });

    fireEvent.press(sut.getByText(/cancelar/i));

    expect(cancel).toHaveBeenCalledTimes(1);
  });
  it("should display confirm button and call its callback", async () => {
    const confirm = jest.fn();

    const { sut } = makeSut({
      visible: true,
      confirm,
    });

    fireEvent.press(sut.getByText(/confirmar/i));

    expect(confirm).toHaveBeenCalledTimes(1);
  });
});
