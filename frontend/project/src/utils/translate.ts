import { useSelector } from "react-redux";

import { LanguagesMapping } from "../translations/LanguagesMapping";
import { RootState } from "../store/stor";

export const GetText = (key: string): string => {
  const language:string = useSelector((state: RootState) => state.language.language);

  const translation:any= LanguagesMapping[key as keyof typeof LanguagesMapping];
  return translation ? translation[language] : key; 
};
