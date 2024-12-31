
import { HomeTranslations } from "./HomeTranslations";
export const LanguagesMapping: Record<string, { en: string; sv: string }> = {
  ...HomeTranslations,
};

export type LanguageKeys = keyof typeof LanguagesMapping;