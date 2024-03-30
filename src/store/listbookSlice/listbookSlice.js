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
console.log(response);
    return response.data;
  }
);

// export const newListBook = createAsyncThunk(
//   "list-book",
//   async (payload) => {
//     const config = {
//       url: "http://localhost:8000/api/list-book",
//       method: "post",
//       listBook: payload
//     };
//     const response = await axios(config)
//       .then((res) => {
//         console.log("HttpBin repondru ", res);
//         return res;
//       })
//       .catch((err) => {
//         console.error("Error: ", err);
//         return err;
//       });
// console.log(response);
//     return response.data;
//   }
// );



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
        console.log("Pending");
        state.status = "loading";
      })
      .addCase(getListBook.fulfilled,  (state, action) => {
        state.status = "succeed";
        console.log("Success", action.payload);
        
        state.listbook = action.payload;
        console.log(state.listbook);
      })
      .addCase(getListBook.rejected,  (state, action) => {
        console.error("Error");
        state.status = "failed";
      })
      ;
  },
});

// const newListbookSlice = createSlice({
//   name: "postlistbook",
//   initialState: {
//     listbook: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers(builder) {
//     builder
//       .addCase(postListBook.pending,  (state, action) => {
//         console.log("Pending");
//         state.status = "loading";
//       })
//       .addCase(postListBook.fulfilled,  (state, action) => {
//         state.status = "succeed";
//         console.log("Success", action.payload);
        
//         state.listbook = action.payload;
//         console.log(state.listbook);
//       })
//       .addCase(postListBook.rejected,  (state, action) => {
//         console.error("Error");
//         state.status = "failed";
//       })
//       ;
//   },
// });

export const { fetchListbook } = listbookSlice.actions;
//export const { postListbook } = newListbookSlice.actions;

export default listbookSlice.reducer;
//export default newListbookSlice.reducer;
