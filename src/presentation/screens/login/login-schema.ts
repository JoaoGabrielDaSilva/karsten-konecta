import * as yup from "yup";

export const makeLoginSchema = () =>
  yup.object().shape({
    login: yup
      .string()
      .required("O e-mail deve ser informado")
      .email("O e-mail deve ser válido"),
    password: yup
      .string()
      .required("A senha deve ser informada")
      .min(3, "A senha deve conter no mínimo 3 caracteres"),
  });
