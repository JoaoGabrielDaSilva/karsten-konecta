import { faker } from "@faker-js/faker";
import {
  MenuListModel,
  MenuModel,
} from "../../../../src/domain/models/menu-model";
import { UserModel } from "../../../../src/domain/models/user-model";
import { Profile } from "../../../../src/domain/usecases/user/get-user-data";

const mockMenuListItem = (): MenuListModel[] => {
  const name = faker.word.noun();
  const parent = faker.word.noun();

  return [
    {
      title: parent,
      data: [
        {
          name,
          internalName: name,
          parentName: parent,
        },
      ],
    },
  ];
};

export const mockUserModel = (): UserModel => ({
  email: faker.internet.email(),
  name: faker.name.fullName(),
  profileList: [Profile.ADM],
  menuList: mockMenuListItem(),
});
