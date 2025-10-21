import { createSlice, createEntityAdapter} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PostsT } from "../../model/types";
import type { RootState } from "../../../../app/providers/store/store";

const postsAdapter = createEntityAdapter<PostsT, number>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.id - a.id,
});

const postSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({
    selectedPostId: null as number | null,
  }),
  reducers: {
    setAllPosts: postsAdapter.setAll,
    addPost: postsAdapter.addOne,
    removePost: postsAdapter.removeOne,
    updatePost: postsAdapter.updateOne,
    selectPost: (state, action: PayloadAction<number | null>) => {
      state.selectedPostId = action.payload;
    },
  },
});

export const { setAllPosts, addPost, removePost, updatePost, selectPost } =
  postSlice.actions;

export default postSlice.reducer;

export const postsSelectors = postsAdapter.getSelectors<RootState>(
  (state) => state.post
);