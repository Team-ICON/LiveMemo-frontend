import React, { useEffect, useMemo } from 'react'
import MemoList from './MemoList/MemoList'
import { v4 as uuid } from 'uuid';
import getRandomUserName from './utils/getRandomUserName';
import Memo from "./Memo/Memo"
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


const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        }))
      }

    })
  }, [])

  const currentUser = useMemo(() => {
    const id = uuid();
    return {
      id,
      name: getRandomUserName(id)
    };
  }, []);



  return (
    <Router>
      {!user ? (<Login />) :
        (
          <div className="app">
            <div className="app__body">
              <Routes>

                {/* 아니다 걍 doc 아이디랑 나중에 userid만 넘기면 됨 그럼 reducer로는 현 docid slice만 해서 여기서 주면됨 */}
                <Route path="/" element={<MemoList currentUser={currentUser} />} />
                <Route path="createMemo/:newRoomId" element={<CreateMemo currentUser={currentUser} />} />
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
