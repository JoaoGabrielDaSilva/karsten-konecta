import { faker } from "@faker-js/faker";
import { cepMask } from "../../../../src/presentation/utils/mask/cep-mask";

describe("CepMask", () => {
  it("should format number to xxxxx-xxx", () => {
    const randomNumber = faker.random.numeric(8);

    const formattedNumber = cepMask(randomNumber);

    expect(formattedNumber).toBe(
      `${randomNumber.slice(0, 5)}-${randomNumber.slice(5, 8)}`
    );
  });
});
