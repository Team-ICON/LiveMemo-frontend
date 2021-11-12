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

  const roomId = uuid();

  return (
    <Router>
      {!user ? (<Login />) :
        (
          <div className="app">
            <div className="app__body">
              <Routes>
                <Route path="/memo" element={<Memo />} />
                <Route path="/" element={<MemoList />} />
                <Route path="createMemo" element={<CreateMemo roomId={roomId} currentUser={currentUser} />} />
                {/* <Route path="createMemo" render={<CreateMemo />} /> */}

              </Routes>
            </div>

          </div>
        )}
    </Router>
  )
}

export default App
