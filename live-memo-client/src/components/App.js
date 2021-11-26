import React, { useState, useEffect, lazy, Suspense } from 'react'
import axios from 'axios';
import { Cookies } from "react-cookie"
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Box from '@mui/material/Box';
import { selectUser, login } from "../features/userSlice"
import { useSelector, useDispatch } from 'react-redux';
// import CreateMemo from "./CreateMemo/CreateMemo"
import CircularProgress from '@mui/material/CircularProgress';
import { api } from "../axios";
import { SubscribeUser } from "../push"
import useImportScript from "./hooks/useImportScript"
const firebase_app = "https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js"
const firebase_messaging = "https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js"
const CreateMemo = lazy(() => import("./CreateMemo/CreateMemo"))
const MemoList = lazy(() => import("./MemoList/MemoList"))
const Login = lazy(() => import("../components/LoginPage/Login"))
const FolderList = lazy(() => import("./FolderList/FolderList"))
const GetToken = lazy(() => import("./GetToken/GetToken"))

const App = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    api.get('/user/userinfo')
      .then((response) => {
        let User = response.data.user;
        dispatch(login({
          displayName: User.profileName,
          email: User.email,
          picture: User.picture
        }))
      })
  }, [])


  const user = useSelector(selectUser);

  const isToken = localStorage.getItem('livememo-token');
  // console.log(`fromCookies`, fromCookies);
  const [token, setToken] = useState();
  // console.log(`token`, token);

  useEffect(() => {
    setToken(isToken);
  }, [token])

  useImportScript(firebase_app)
  useImportScript(firebase_messaging)


  return (
    <Router>
      <Suspense fallback={
        <Box className="spinner" >
          <CircularProgress className="spinner__icon" color="secondary" />
        </Box>
      }>
        {!token ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/token/:token" element={<GetToken />} />
          </Routes>
        ) :
          (
            <div className="app">
              <div className="app__body">
                <Routes>
                  {/* 아니다 걍 doc 아이디랑 나중에 userid만 넘기면 됨 그럼 reducer로는 현 docid slice만 해서 여기서 주면됨 */}
                  <Route path="/" element={<MemoList currentUser={user} socket={socket} />} />
                  <Route path="createMemo/:newRoomId" element={<CreateMemo currentUser={user} socket={socket} />} />
                  {/* <Route path="createMemo" render={<CreateMemo />} /> */}
                  <Route path="/folder" element={<FolderList />} />
                  {/* <Route path="/history" element={<History />} /> */}

                </Routes>
              </div>
            </div>
          )}
      </Suspense>
    </Router>
  )
}

export default App
