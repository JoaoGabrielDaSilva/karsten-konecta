import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subDays } from "date-fns";

const emailList = [
  {
    subject: "Class",
    sender: "João Gabriel",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    subject: "Teste",
    sender: "João Gabriel",
    date: subDays(new Date(), 1),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    subject: "Joooao",
    sender: "João Gabriel",
    date: subDays(new Date(), 10),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste pariatur perferendis hic aperiam corporis tenetur? Fugiat, obcaecati quia deserunt reprehenderit, repellat odio saepe aut deleniti, laboriosam praesentium aliquid beatae vel!",
    senderImageUrl:
      "https://yt3.ggpht.com/yti/AJo0G0keGO8w7HSrgBiA83C10ruLrf9thc1QwZ3E5fRfoA=s88-c-k-c0x00ffffff-no-rj-mo",
  },
];

type EmailState = {
  emailList: typeof emailList;
  reset: void;
};

const initialState = { emailList };

export const useEmailStore = create<EmailState>()((set) => ({
  ...initialState,
  reset: set({ emailList }, true),
}));
