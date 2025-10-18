import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { UserT } from "../types";
import type { RootState } from "../../../../app/providers/store/store";

const usersAdapter = createEntityAdapter<UserT, number>({
  selectId: (user) => user.id,
});

const userSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    setAllUsers: usersAdapter.setAll,
    addUser: usersAdapter.addOne,
  },
});

export const { setAllUsers, addUser } = userSlice.actions;
export default userSlice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.user
);