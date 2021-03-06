import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { enableMapSet, produce } from 'immer';
enableMapSet()

const initialState = {
  selectedMemo: null,
  selectedDoc: null,
  openedProvider: null,
  roomsStatus: new Map(),
  drawerStatus: false

}
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectMemo: (state, action) => {
      state.selectedMemo = action.payload
    },
    selectProvider: (state, action) => {
      state.openedProvider = action.payload
    },
    deleteProvider: () =>
      initialState
    ,
    selectDoc: (state, action) => {
      state.selectedDoc = action.payload
    }
    ,
    setRoomsStatus: (state, action) => {
      state.roomsStatus = new Map(state.roomsStatus).set(action.payload.key, action.payload.value)
    },
    setDrawerStatus: (state, action) => {
      state.drawerStatus = action.payload
    }

  }
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

});

export const { selectMemo, selectProvider, deleteProvider, selectDoc, setRoomsStatus, setDrawerStatus } = memoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOpenMemo = (state) => state.memo.selectedMemo;
export const selectMemoIsOpen = (state) => state.memo.MemoIsOpen;
export const selectOpenProvider = (state) => state.memo.openedProvider;
export const selectOpenDoc = (state) => state.memo.selectedDoc;
export const selectRoomsStatus = (state) => state.memo.roomsStatus;
export const selectDrawerStatus = (state) => state.memo.DrawerStatus;


export default memoSlice.reducer;
