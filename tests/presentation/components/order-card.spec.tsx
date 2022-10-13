import { faker } from "@faker-js/faker";
import { fireEvent, RenderResult } from "@testing-library/react-native";
import { ProductModel } from "../../../src/domain/models/product";
import {
  OrderCardProps,
  OrderCard,
} from "../../../src/presentation/components/cards/order-card/order-card";
import { cpfMask } from "../../../src/presentation/utils/mask/cpf-mask";

import { renderWithProviders } from "../__mocks__/app.provider";

type SutTypes = {
  sut: RenderResult;
  data: OrderCardProps;
};

const mockProps = (): OrderCardProps => ({
  createdAt: faker.date.past().toISOString(),
  attendanceId: faker.random.numeric(),
  customerName: faker.name.firstName(),
  approvedAt: faker.date.past().toISOString(),
  orderCode: faker.random.numeric(4),
  status: faker.random.word(),
  totalProductsIn: faker.random.numeric(1),
});

const makeSut = (props?: Partial<OrderCardProps>): SutTypes => {
  const mockedProps = mockProps();

  const sut = renderWithProviders({
    Screen: () => <OrderCard {...mockedProps} {...props} />,
  });

  return {
    sut,
    data: mockedProps,
  };
};

describe("OrderCard", () => {
  it("should show correct data", async () => {
    const { sut, data } = makeSut();

    sut.getByText(data.orderCode);
    sut.getByText(data.status);
    sut.getByText(data.customerName);

    sut.getByText(data.createdAt);
    sut.getByText(data.totalProductsIn);

    const listRow = sut.UNSAFE_getByProps({
      label: "Resumo do pedido",
    });

    expect(listRow.props.rightIcon).toBe("chevron-right");
    expect(listRow.props.rightIconFamily).toBe("feather");
    expect(listRow.props.borderless).toBe(true);
  });

  it("should call onPress with correct data", async () => {
    const onPress = jest.fn();
    const { sut, data } = makeSut({
      onPress,
    });

    fireEvent.press(
      sut.UNSAFE_getByProps({
        label: "Resumo do pedido",
      })
    );

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(data.attendanceId);
  });
});
