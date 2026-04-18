import { texts } from "./texts";

export const createTranslator = (lang) => {
  return function t(key) {
    return texts?.[lang]?.[key] || key;
  };
};