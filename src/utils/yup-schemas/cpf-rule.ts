import * as yup from "yup";
import { validateCpf } from "../validation/validate-cpf";

export const cpfSchema = yup.object({
  cpf: yup
    .string()
    .test("cpfRule", "Digite um CPF válido!", (value) =>
      value.length < 14 ? true : validateCpf(value)
    ),
});
