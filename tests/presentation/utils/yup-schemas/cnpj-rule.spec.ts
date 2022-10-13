import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";
import { makeCnpjRule } from "../../../../src/presentation/utils/yup-schemas/cnpj-rule";

type SutTypes = {
  sut: typeof makeCnpjRule;
};

const makeSut = (): SutTypes => {
  const sut = makeCnpjRule;

  return {
    sut,
  };
};

describe("yup cnpj rule", () => {
  it("should validate cnpj if it is valid", async () => {
    const validCnpj = "60906245000104";

    const { sut } = makeSut();

    expect(await sut().validate(validCnpj)).toBeTruthy();
  });
  it("should throw error if cnpj is empty", async () => {
    const { sut } = makeSut();

    const promise = sut().validate("");

    expect(promise).rejects.toThrow(
      new ValidationError("O CNPJ deve ser informado")
    );
  });
  it("should throw error if cnpj is invalid", async () => {
    const validCnpj = faker.random.numeric(4);

    const { sut } = makeSut();

    const promise = sut().validate(validCnpj);

    expect(promise).rejects.toThrow(
      new ValidationError("Digite um CNPJ válido!")
    );
  });
});
