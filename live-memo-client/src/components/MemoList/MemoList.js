import React, { useState, useEffect } from 'react'
import "./MemoList.css"
import MemoRow from "../MemoRow/MemoRow"
import { closeMemo } from '../../features/memoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase'
import { useNavigate } from "react-router-dom"
import { Navigate } from 'react-router';
import { IconButton } from "@mui/material"
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FlipMove from "react-flip-move"
import Layout from '../Layout/Layout'
import { v4 as uuid } from 'uuid';
import { Cookies } from "react-cookie";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import axios from "axios"
import { selectOpenMemo, selectOpenProvider } from '../../features/memoSlice';
// const firstState = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"
const { Title } = Typography

const cookies = new Cookies();
const token = cookies.get('livememo-token');

const api = axios.create({
    baseURL: 'http://localhost:4000/api/memo',
    headers: {
        'Content-Type': 'application/json',
        'authorization': token ? `Bearer ${token}` : ''
    }
});


function MemoList() {
    const [memos, setMemos] = useState([])
    const [contents, setContents] = useState([])
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const newRoomId = uuid();
    useEffect(() => {
        api.get('/getMemos')
            .then(response => {

                if (response.data.success) {
                    // console.log("memoList 49 : ", response.data.memos)
                    setMemos(response.data.memos.map(memo => ({
                        roomId: memo._id,
                        doc: memo.content,
                        updatedTime: memo.updateTime,
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

        memos.map(({ roomId, doc, updatedTime }) => {
            if (doc !== null) {
                let cur_list = []
                // console.log(doc)
                let jsonDoc = JSON.parse(doc)
                // console.log(jsonDoc)
                if (jsonDoc.content.length >= 1) {

                    jsonDoc.content.map(para => {
                        if (Object.keys(para).length >= 2) {

                            cur_list = [...cur_list, para.content[0].text]
                        }

                    })
                    temp.push({ roomId: roomId, context: cur_list, updatedTime: updatedTime })
                }
            }
        })

        setContents(temp)

    }, [memos])

    // console.log("MemoList 90:", contents)


    const Footer = () => {


        const navigate = useNavigate()
        // console.log(newRoomId)
        return (
            <div className="footer">
                <div className="footer__right">
                    <Fab size="small" color="secondary" aria-label="add" className="footer__addicon" onClick={() => navigate(`/createMemo/${newRoomId}`, { state: newRoomId })}>
                        <AddIcon />
                    </Fab>
                </div>
            </div>

        )

    };


    // console.log(contents)
    // return (

    //     <div className="memoList">
    //         <Layout>
    //             <div className="memoList__list">

    //                 {contents.map(({ roomId, context, updatedTime }) => (
    // <MemoRow
    //     key={roomId}
    //     roomId={roomId}
    //     contents={context}
    //     time={new Date(updatedTime).toDateString()} />
    //                     //  {/* new Date(createdAt).toDateString() */}
    //                 ))}



    //                 <Footer />

    //             </div>
    //         </Layout>
    //     </div>
    // )




    return (
        <div className="memoList">
            <Layout>
                <div style={{ width: '85%', margin: '3rem auto' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} >
                            {contents.map((memo, index) =>
                            (

                                <Grid item key={index} columns={{ xs: 4, sm: 8, md: 12 }} >

                                    <MemoRow
                                        key={memo.roomId}
                                        roomId={memo.roomId}
                                        contents={memo.context}
                                        time={new Date(memo.updatedTime).toDateString()} />


                                </Grid>
                            )
                            )}
                        </Grid>
                    </Box>
                </div>
                <Footer />
            </Layout>
        </div >
    )




}

export default MemoList


