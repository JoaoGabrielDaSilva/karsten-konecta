import * as yup from "yup";
import { validateCpf } from "../validation/validate-cpf";

export const makeCpfRule = () =>
  yup
    .string()
    .required("O CPF deve ser informado")
    .test("cpfRule", "Digite um CPF válido!", validateCpf);
