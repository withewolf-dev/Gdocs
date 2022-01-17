import { atom } from "recoil";

export const docsState = atom({
  key: "docsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
