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
// const firstState = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"

const api = axios.create({
    baseURL: 'http://localhost:5000/api/memo',
    headers: { 'Content-Type': 'application/json' },
});


function MemoList() {
    const [memos, setMemos] = useState([])
    const [contents, setContents] = useState([])
    const dispatch = useDispatch();



    useEffect(() => {
        api.get('/getMemos')
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data)
                    setMemos(response.data.memos.map(memo => ({
                        roomId: memo._id,
                        doc: memo.body,
                        createdTime: memo.createdAt,
                        updatedTime: memo.updatedAt
                    })
                    ))
                } else {
                    alert('Couldnt get memo`s lists')
                }
            })
    }, [])

    //컨텐츠 파싱
    useEffect(() => {
        let temp = []

        memos.map(({ roomId, doc, createdTime, updatedTime }) => {
            let cur_list = []
            console.log(doc)
            let jsonDoc = JSON.parse(doc)
            console.log(jsonDoc)
            if (jsonDoc.content.length >= 1) {

                jsonDoc.content.map(para => {
                    if (Object.keys(para).length >= 2) {

                        cur_list = [...cur_list, para.content[0].text]
                    }

                })
                temp.push({ roomId: roomId, context: cur_list, createdTime: createdTime, updatedTime: updatedTime })
            }
        })

        setContents(temp)
    }, [memos])




    console.log(contents)
    return (

        <div className="memoList">
            <Layout>
                <div className="emailList__list">

                    <FlipMove>
                        {contents.map(({ roomId, context, createdTime }) => (
                            <MemoRow
                                roomId={roomId}
                                contents={context}
                                time={new Date(createdTime).toDateString()} />
                            //  {/* new Date(createdAt).toDateString() */}
                        ))}


                    </FlipMove>



                </div>
            </Layout>
        </div>
    )
}

export default MemoList


