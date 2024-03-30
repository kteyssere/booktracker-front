import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getListBook = createAsyncThunk(
  "list-book",
  async (payload) => {
    const config = {
      url: "http://localhost:8000/api/list-book",
      method: "get",
    };
    const response = await axios(config)
      .then((res) => {
        console.log("HttpBin repondru ", res);
        return res;
      })
      .catch((err) => {
        console.error("Error: ", err);
        return err;
      });

    return response.data;
  }
);


const listbookSlice = createSlice({
  name: "listbook",
  initialState: {
    listbook: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListBook.pending,  (state, action) => {
        state.status = "loading";
      })
      .addCase(getListBook.fulfilled,  (state, action) => {
        state.status = "succeed";
        state.listbook = action.payload;
      })
      .addCase(getListBook.rejected,  (state, action) => {
        state.status = "failed";
      })
      ;
  },
});


export const { fetchListbook } = listbookSlice.actions;

export default listbookSlice.reducer;
