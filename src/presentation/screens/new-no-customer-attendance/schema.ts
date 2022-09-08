import * as yup from "yup";

export const makeNewNoCustomerAttendanceSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .required("O nome do cliente deve ser informado")
      .min(3, "O nome do cliente deve conter pelo menos 3 caracteres"),
  });
