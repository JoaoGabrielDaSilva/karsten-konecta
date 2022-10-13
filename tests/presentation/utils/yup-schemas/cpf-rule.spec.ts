import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";
import { makeCpfRule } from "../../../../src/presentation/utils/yup-schemas/cpf-rule";

type SutTypes = {
  sut: typeof makeCpfRule;
};

const makeSut = (): SutTypes => {
  const sut = makeCpfRule;

  return {
    sut,
  };
};

describe("yup cpf rule", () => {
  it("should validate cpf if it is valid", async () => {
    const validCnpj = "03284738045";

    const { sut } = makeSut();

    expect(await sut().validate(validCnpj)).toBeTruthy();
  });
  it("should throw error if cpf is empty", async () => {
    const { sut } = makeSut();

    const promise = sut().validate("");

    expect(promise).rejects.toThrow(
      new ValidationError("O CPF deve ser informado")
    );
  });
  it("should throw error if cpf is invalid", async () => {
    const validCnpj = faker.random.numeric(10);

    const { sut } = makeSut();

    const promise = sut().validate(validCnpj);

    expect(promise).rejects.toThrow(
      new ValidationError("Digite um CPF válido!")
    );
  });
});
