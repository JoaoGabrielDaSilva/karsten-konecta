import * as yup from "yup";
import { cpfRule } from "../../utils/yup-schemas/cpf-rule";

export const customerRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .required("O nome deve ser informado"),
  email: yup
    .string()
    .required("O e-mail deve ser informado")
    .email("O e-mail deve ser válido"),
  cpf: cpfRule,
  phone: yup
    .string()
    .required("O telefone deve ser informado")
    .test(
      "phone-rule",
      "Digite um telefone válido",
      (value) => value && value.replace(/\D/g, "").length >= 8
    ),
  gender: yup.string().required("EEEE"),
});
