import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface initialStateType {
  totalPrice: number;
}
const initialState: initialStateType = {
  totalPrice: 0
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    }
  }
});
export const { setTotalPrice } = CartSlice.actions;
export default CartSlice.reducer;
