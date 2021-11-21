import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import { Cookies } from "react-cookie"
import MemoList from './MemoList/MemoList'
import { v4 as uuid } from 'uuid';
import getRandomUserName from './utils/getRandomUserName';
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { selectUser } from "../features/userSlice"
import { login } from "../features/userSlice"
import { auth } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import Login from "../components/LoginPage/Login"
import CreateMemo from "./CreateMemo/CreateMemo"
import FolderList from "./FolderList/FolderList"
import History from "./History/History"



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

        dispatch(login({
          displayName: User.profileName,
          email: User.email,
          // photoUrl: user.photoURL
        }))

      })
    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     dispatch(login({
    //       displayName: user.displayName,
    //       email: user.email,
    //       photoUrl: user.photoURL
    //     }))
    //   }

    // })
  }, [])

  const user = useSelector(selectUser)



  const newRoomId = uuid();

  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(cookies.get('livememo-token'));

  }, [])




  return (
    <Router>
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
    </Router>
  )
}

export default App
