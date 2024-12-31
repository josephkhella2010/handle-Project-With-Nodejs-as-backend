import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  username: string;
  password: string;
}

interface initialStateType {
  isRegister: boolean;
  isLogged: boolean;
  userInfo: UserInfo | null;
}

const initialState: initialStateType = {
  isRegister: false,
  isLogged: false,
  userInfo: null
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsRegister: (state, action: PayloadAction<boolean>) => {
      state.isRegister = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    }
  }
});

export const { setIsRegister, setIsLoggedIn, setUserInfo } = LoginSlice.actions;
export default LoginSlice.reducer;
