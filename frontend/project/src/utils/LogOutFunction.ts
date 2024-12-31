import { setIsLoggedIn, setUserInfo } from "../reducer/LoginSlice"

export function isLogout(dispatch:any) {
  
      localStorage.removeItem("user");
      dispatch(setIsLoggedIn(false));
      dispatch(setUserInfo({ username: "", password: "" }));
  
  }