import { faker } from "@faker-js/faker";
import { StoreModel } from "../../../../src/domain/models/store-model";

export const mockStore = (): StoreModel => ({
  id: faker.random.numeric(4),
  cnpj: faker.random.numeric(14),
  corporateName: faker.company.name(),
  adhesionModalityId: faker.random.numeric(1),
  saleModalityId: faker.random.numeric(1),
  hasAcceptedMembershipTerm: !!Math.random(),
  isMultiBrand: !!Math.random(),
  name: faker.company.name(),
});

export const mockStoreList = (length = 5): StoreModel[] =>
  Array.from({ length }).map(() => mockStore());
