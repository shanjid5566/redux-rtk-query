import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./services/posts/postsApi";

export default configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postApi.middleware);
  },
});
