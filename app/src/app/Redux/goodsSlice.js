import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchGoods= createAsyncThunk("/posts/fetchGoods", async () => {
 const {data} = await axios.get("/posts");
 return data;
}
)

// export const fetchGood= createAsyncThunk("/posts/fetchGood", async (id) => {
//   const {data} = await axios.get(`/posts/${id}`);
//   return data;
//  }
//  )

export const fetchRemoveGoods = createAsyncThunk("/posts/fetchRemovePost", async (id) => 
 axios.delete(`/posts/${id}`)
)
export const initialState = {
   goods:[],
   status:"loading"

}

export const goodsSlice = createSlice({
  name: "goods",
  initialState: initialState ,
  reducers: {
  }, 
  extraReducers: {
    [fetchGoods.pending]: (state) => {
      state.goods = [];
      state.status = "loading";
  },
    [fetchGoods.fulfilled]: (state,action) => {
      state.goods = action.payload
      state.status = "loaded";
  },
    [fetchGoods.rejected]: (state,action) => {
     state.goods = [];
     state.status = "error";
  },

//   [fetchGood.pending]: (state,action) => {
//     state.goods = state.goods.find(obj => obj._id = action.meta.arg);
// },
    [fetchRemoveGoods.pending]: (state,action) => {
        state.goods = state.goods.filter(obj => obj._id != action.meta.arg);
    },
  } ,
})
export const {setGoods, } = goodsSlice.actions
export default goodsSlice.reducer