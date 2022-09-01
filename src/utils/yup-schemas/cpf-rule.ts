import * as yup from "yup";
import { validateCpf } from "../validation/validate-cpf";

export const cpfRule = yup
  .string()
  .test("cpfRule", "Digite um CPF válido!", validateCpf);
