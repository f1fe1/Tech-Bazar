import { createSlice } from '@reduxjs/toolkit';
export const initialState ={
    catId:"all",
    selected:0,
}
export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState ,
  reducers: {
    setCatId (state,action){
      state.catId = action.payload
    },
   getCatId (state,action) {
      state.catId = action.payload
    },
  },
})
export const {getCatId,  setCatId } = filterSlice.actions

export default filterSlice.reducer