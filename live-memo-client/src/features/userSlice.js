import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    curUserList: []
};

export const checkSetCurUser = createAsyncThunk(
    'user/checkSetCurUser',
    (webrtcPeers, currentUser) => {
        if (webrtcPeers !== undefined) {
            webrtcPeers = webrtcPeers.filter(member => member !== currentUser)
            return webrtcPeers
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: state => {
            state.user = null;
        },

        setCurUserList: (state, action) => {
            state.curUserList = action.payload.webrtcPeers
        }

    },
    extraReducers: (builder) => {
        builder.addCase(checkSetCurUser.fulfilled, (state, action) => {
            state.curUserList = action.payload.webrtcPeers
        })
    }


});

export const { login, logout, setCurUserList } = userSlice.actions;


export const selectUser = (state) => state.user.user;
export const getCurUsers = (state) => state.user.curUserList;

export default userSlice.reducer;
