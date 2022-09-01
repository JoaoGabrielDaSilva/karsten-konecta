export const validateCpf = (value: string) => {
  if (!value) return;
  value = value?.replace(/\D/g, "");

  if (!!value.match(/(\d)\1{10}/)) {
    return false;
  }

  let sum = 0;
  let rest = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(value.charAt(i)) * (10 - i);
  rest = 11 - (sum % 11);
  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(value.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(value.charAt(i)) * (11 - i);
  rest = 11 - (sum % 11);
  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(value.charAt(10))) return false;
  return true;
};
