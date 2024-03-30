import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import listbookSlice from "./listbookSlice/listbookSlice";


const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.status = "succeed";
        state.book = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

const booksearchSlice = createSlice({
  name: "booksearch",
  initialState: {
    booksearch: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBookSearch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBookSearch.fulfilled, (state, action) => {
        state.status = "succeed";
        state.booksearch = action.payload;
      })
      .addCase(getBookSearch.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});


const latestProgressionSlice = createSlice({
  name: "latestProgression",
  initialState: {
    latestProgression: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.status = "succeed";
        state.book = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});



export const getBook = createAsyncThunk(
  "book",
  async (payload) => {

    const config = {
      url: "http://localhost:8000/api/book/" + payload,
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

export const getBookSearch = createAsyncThunk(
  "booksearch",
  async (payload) => {

    const config = {
      url: "http://localhost:8000/api/book/?query=" + payload,
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

export const getLatestProgression = createAsyncThunk(
  "latestProgression",
  async (payload) => {

    const config = {
      url: "http://localhost:8000/api/progression/latest",
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

export const store = configureStore({
  reducer: {
    listbook: listbookSlice,
    book: bookSlice.reducer,
    booksearch: booksearchSlice.reducer,
    latestProgression: latestProgressionSlice.reducer
  },
});

export const { fetchBook } = bookSlice.actions;
export const { fetchBookSearch } = booksearchSlice.actions;
export const { fetchLatestProgression } = latestProgressionSlice.actions;

