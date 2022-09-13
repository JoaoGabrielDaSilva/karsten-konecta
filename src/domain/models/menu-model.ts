export type MenuModel = {
  name: string;
  internalName: string;
  parentName: string;
};

export type MenuListModel = {
  title: string;
  data: MenuModel[];
};
