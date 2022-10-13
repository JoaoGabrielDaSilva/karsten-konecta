import { faker } from "@faker-js/faker";
import { cnpjMask } from "../../../../src/presentation/utils/mask/cnpj-mask";

describe("CnpjMask", () => {
  it("should format number to xxx.xxx.xxx-xx", () => {
    const randomNumber = faker.random.numeric(14);

    const formattedNumber = cnpjMask(randomNumber);

    expect(formattedNumber).toBe(
      `${randomNumber.slice(0, 2)}.${randomNumber.slice(
        2,
        5
      )}.${randomNumber.slice(5, 8)}/${randomNumber.slice(
        8,
        12
      )}-${randomNumber.slice(12, 14)}`
    );
  });
});
