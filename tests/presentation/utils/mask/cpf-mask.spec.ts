import { faker } from "@faker-js/faker";
import { cpfMask } from "../../../../src/presentation/utils/mask/cpf-mask";

describe("CpfMask", () => {
  it("should format number to xxx.xxx.xxx-xx", () => {
    const randomNumber = faker.random.numeric(11);

    const formattedNumber = cpfMask(randomNumber);

    expect(formattedNumber).toBe(
      `${randomNumber.slice(0, 3)}.${randomNumber.slice(
        3,
        6
      )}.${randomNumber.slice(6, 9)}-${randomNumber.slice(9, 11)}`
    );
  });
});
