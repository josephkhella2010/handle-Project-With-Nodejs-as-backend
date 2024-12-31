import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LanguageType {
  language: string;
}
const initialState: LanguageType = {
  language: localStorage.getItem("language") || "sv"
};
const LanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    handleLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    }
  }
});
export const { handleLanguage } = LanguageSlice.actions;
export default LanguageSlice.reducer;
