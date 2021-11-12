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
import axios from "axios"
const api = axios.create({
    baseURL: 'http://localhost:5000/api/memo',
    headers: { 'Content-Type': 'application/json' },
});


function MemoList() {
    const [memos, setMemos] = useState([])
    // const [contents, setContents] = useState([])
    const dispatch = useDispatch();



    useEffect(() => {
        api.get('/getMemos')
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data)
                    setMemos(response.data.memos.map(memo => ({
                        roomId: memo._id,
                        doc: memo.body
                    })
                    ))
                } else {
                    alert('Couldnt get memo`s lists')
                }
            })
    }, [])

    //컨텐츠 파싱

    // let contents = {}
    // let cur_list = []
    // memos.map(memo => {
    //     JSON.parse(memo.doc).content.map(para => {
    //         cur_list = [...cur_list, [para.content[0].text]]
    //         console.log(cur_list)
    //     })
    //     contents = { ...contents, { roodId: memo.roodId, context: cur_list }
    // }
    // })



    // console.log(memos)

    // console.log(contents)
    return (

        <div className="memoList">
            <Layout>
                <div className="emailList__list">

                    <FlipMove>
                        <MemoRow
                            title="첫 제목"
                            contents="안녕"
                            time="시간">
                            {/* new Date(createdAt).toDateString() */}
                        </MemoRow>

                    </FlipMove>



                </div>
            </Layout>
        </div>
    )
}

export default MemoList


