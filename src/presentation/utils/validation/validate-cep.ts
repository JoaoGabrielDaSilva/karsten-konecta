export const validateCep = (value: string) => {
  if (!value) "";

  return String(value).replace(/\D/g, "").length === 8;
};
