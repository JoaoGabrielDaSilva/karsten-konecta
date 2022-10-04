import { Profile } from "../usecases/user/get-user-data";
import { MenuListModel } from "./menu-model";

export type UserModel = {
  name: string;
  email: string;
  profileList: Profile[];
  menuList: MenuListModel[];
};
