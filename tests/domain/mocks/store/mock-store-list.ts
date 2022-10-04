import { faker } from "@faker-js/faker";
import { StoreModel } from "../../../../src/presentation/models/Store";

export const mockStoreList = (): StoreModel[] => [
  {
    name: faker.company.name(),
    cnpj: faker.random.numeric(14),
    adhesionModalityId: faker.random.numeric(1),
    saleModalityId: faker.random.numeric(1),
    corporateName: faker.company.name(),
    id: faker.random.numeric(),
    isMultiBrand: !!Math.random(),
    hasAcceptedMembershipTerm: !!Math.random(),
  },
];
