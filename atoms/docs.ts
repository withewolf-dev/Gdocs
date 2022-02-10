import { atom } from "recoil";

export const docsState = atom({
  key: "docsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const DocsLoadingState = atom({
  key: "docsLoadingState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
