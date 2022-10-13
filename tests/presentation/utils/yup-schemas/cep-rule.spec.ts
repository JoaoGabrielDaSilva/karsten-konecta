import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";
import { makeCepRule } from "../../../../src/presentation/utils/yup-schemas/cep-rule";

type SutTypes = {
  sut: typeof makeCepRule;
};

const makeSut = (): SutTypes => {
  const sut = makeCepRule;

  return {
    sut,
  };
};

describe("yup cep rule", () => {
  it("should validate cep if it is valid", async () => {
    const validCnpj = faker.random.numeric(8);

    const { sut } = makeSut();

    expect(await sut().validate(validCnpj)).toBeTruthy();
  });
  it("should throw error if cep is empty", async () => {
    const { sut } = makeSut();

    const promise = sut().validate("");

    expect(promise).rejects.toThrow(
      new ValidationError("O CEP deve ser informado")
    );
  });
  it("should throw error if cep is invalid", async () => {
    const validCnpj = faker.random.numeric(4);

    const { sut } = makeSut();

    const promise = sut().validate(validCnpj);

    expect(promise).rejects.toThrow(
      new ValidationError("Digite um CEP válido!")
    );
  });
});
