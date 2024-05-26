import { createSlice } from '@reduxjs/toolkit';
export const initialState ={
    value:true,
}

export const adminRouterSlice = createSlice({
  name: 'counter',
  initialState: initialState ,
  reducers: {
    changeRouteTrue: (state) => {
      state.value = true;
    },
    changeRouteFalse: (state) => {
      state.value = false;
    },
  },
})
export const { changeRouteFalse, changeRouteTrue } = adminRouterSlice.actions

export default  adminRouterSlice.reducer