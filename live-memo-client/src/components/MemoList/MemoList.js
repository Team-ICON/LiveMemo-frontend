import React, { useState, useEffect } from 'react'
import "./MemoList.css"
import MemoRow from "../MemoRow/MemoRow"
import { closeMemo } from '../../features/memoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase'
import { useNavigate } from 'react-router';
import { Avatar, IconButton } from "@mui/material"
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import FlipMove from "react-flip-move"
import Layout from '../Layout/Layout'

function MemoList() {
    const [memos, setMemos] = useState([])
    const dispatch = useDispatch();




    useEffect(() => {
        db.collection('emails').orderBy('timestamp', 'desc').onSnapshot(snapshot => setMemos(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))))
    }, [])


    return (

        <div className="memoList">
            <Layout>
                <div className="emailList__list">

                    <FlipMove>
                        <MemoRow
                            title="첫 제목"
                            contents="안녕"
                            time="시간">

                        </MemoRow>

                    </FlipMove>

                    <FlipMove>
                        <MemoRow
                            title="첫 제목"
                            contents="안녕"
                            time="시간">

                        </MemoRow>

                    </FlipMove>

                </div>
            </Layout>
        </div>
    )
}

export default MemoList


