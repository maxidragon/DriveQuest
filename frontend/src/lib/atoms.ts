import { atom } from "jotai";

const categoryAtom = atom<string>(
    localStorage.getItem("drive-quest-category") || "B"
);

export { categoryAtom };
