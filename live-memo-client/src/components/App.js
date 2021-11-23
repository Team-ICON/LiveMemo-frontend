import React, { useState, useEffect, lazy, Suspense } from 'react'
import axios from 'axios';
import { Cookies } from "react-cookie"
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Box from '@mui/material/Box';
import { selectUser, login } from "../features/userSlice"
import { useSelector, useDispatch } from 'react-redux';
// import CreateMemo from "./CreateMemo/CreateMemo"
import CircularProgress from '@mui/material/CircularProgress';

const CreateMemo = lazy(() => import("./CreateMemo/CreateMemo"))
const MemoList = lazy(() => import("./MemoList/MemoList"))
const Login = lazy(() => import("../components/LoginPage/Login"))
const FolderList = lazy(() => import("./FolderList/FolderList"))
const History = lazy(() => import("./History/History"))





const cookies = new Cookies();
const token = cookies.get('livememo-token');
const api = axios.create({
  baseURL: 'http://localhost:4000/api/user',
  headers: {
    'Content-Type': 'application/json',
    'authorization': token ? `Bearer ${token}` : ''
  }
});


const App = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    api.get('/userinfo')
      .then((response) => {
        let User = response.data.user;
        console.log(User)
        dispatch(login({
          displayName: User.profileName,
          email: User.email,
          picture: User.picture

        }))

      })

  }, [])

  const user = useSelector(selectUser)



  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(cookies.get('livememo-token'));

  }, [])



  return (
    <Router>
      <Suspense fallback={
        <Box className="spinner" >
          <CircularProgress className="spinner__icon" color="secondary" />
        </Box>
      }>

        {!token ? (<Login />) :
          (
            <div className="app">
              <div className="app__body">
                <Routes>
                  {/* 아니다 걍 doc 아이디랑 나중에 userid만 넘기면 됨 그럼 reducer로는 현 docid slice만 해서 여기서 주면됨 */}
                  <Route path="/" element={<MemoList currentUser={user} />} />
                  <Route path="createMemo/:newRoomId" element={<CreateMemo currentUser={user} />} />
                  {/* <Route path="createMemo" render={<CreateMemo />} /> */}
                  <Route path="/folder" element={<FolderList />} />
                  <Route path="/history" element={<History />} />
                </Routes>
              </div>

            </div>
          )}
      </Suspense>
    </Router>
  )
}

export default App
