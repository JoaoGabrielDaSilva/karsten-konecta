import * as yup from "yup";
import { makeCpfRule } from "../../utils/yup-schemas/cpf-rule";

export const orderResponsibleSchema = yup.object().shape({
  responsibleName: yup.string().when("hasResponsible", {
    is: true,
    then: yup
      .string()
      .required("O nome do responsável deve ser preenchido")
      .min(4, "O nome do responsável deve contar no mínimo 4 caracteres"),
  }),
  responsibleCpf: yup.string().when("hasResponsible", {
    is: true,
    then: makeCpfRule(),
  }),
});
