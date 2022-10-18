const ENV = "PRD";

const URLs = {
  auth: `https://m2pfccboh1.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  user: `https://tcefcrhsw0.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  customer: `https://t1yl0ybs37.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  attendance: `https://6xhpqthjil.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  order: `https://6xhpqthjil.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  product: `https://1z855c323f.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  shipping: `https://2qiyqni09l.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  store: `https://mp7oaud04i.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  storeInfo: `https://228brgmn5l.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  cep: `https://n39n4k4emc.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  stock: `https://pje3oa5qlk.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  reports: `https://xhnbwpl1ob.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  action: `https://48uk60iihc.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
  "sale-link": `https://b6vvpr1y4a.execute-api.us-east-1.amazonaws.com/${ENV}/v1`,
};

export const makeApiUrl = (
  baseUrlKey: keyof typeof URLs,
  path: string
): string => `${URLs[baseUrlKey]}${path}`;
