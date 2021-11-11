import React, { useEffect } from 'react'
import MemoList from './MemoList/MemoList'

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


  return (
    <Router>
      {!user ? (<Login />) :
        (
          <div className="app">
            <div className="app__body">
              <Routes>
                <Route path="/memo" element={<Memo />} />
                <Route path="/" element={<MemoList />} />
                <Route path="createMemo" element={<CreateMemo />} />
              </Routes>
            </div>

          </div>
        )}
    </Router>
  )
}

export default App
