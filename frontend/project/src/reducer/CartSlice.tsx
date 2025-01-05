import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialStateType {
  totalPrice: number;
  totalCartItems: number;
}
const initialState: initialStateType = {
  totalPrice: 0,
  totalCartItems: 0
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    setTotalCartItems: (state, action: PayloadAction<number>) => {
      state.totalCartItems = action.payload;
    }
  }
});
export const { setTotalPrice, setTotalCartItems } = CartSlice.actions;
export default CartSlice.reducer;
