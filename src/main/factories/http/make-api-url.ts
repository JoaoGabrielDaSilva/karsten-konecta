const URLs = {
  auth: "https://m2pfccboh1.execute-api.us-east-1.amazonaws.com/HML/v1",
  login: "https://tcefcrhsw0.execute-api.us-east-1.amazonaws.com/HML/v1",
  customer: "https://t1yl0ybs37.execute-api.us-east-1.amazonaws.com/HML/v1",
  attendance: "https://6xhpqthjil.execute-api.us-east-1.amazonaws.com/HML/v1",
  product: "https://1z855c323f.execute-api.us-east-1.amazonaws.com/HML/v1",
  shipping: "https://2qiyqni09l.execute-api.us-east-1.amazonaws.com/HML/v1",
};

export const makeApiUrl = (
  baseUrlKey: keyof typeof URLs,
  path: string
): string => `${URLs[baseUrlKey]}${path}`;
