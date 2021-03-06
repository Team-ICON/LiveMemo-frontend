import React, { useState, useEffect } from 'react'
import "./MemoList.css"
import MemoRow from "../MemoRow/MemoRow"
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../Layout/Layout'
import { v4 as uuid } from 'uuid';
import { Cookies } from "react-cookie";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone';
import { api } from "../../axios";

import "../../firebase.js";

function MemoList({ currentUser, socket }) {
    const [memos, setMemos] = useState([]);
    const [contents, setContents] = useState([]);
    const [beReload, setBeRealod] = useState(false)
    const [timeToList, setTimeToList] = useState(false)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    //새 메모를 위해 필요
    const roomId = uuid();
    useEffect(() => {
        console.log("28", beReload)
        api.get('/memo/getMemos')
            .then(response => {

                if (response.data.success) {
                    console.log("memoList 49 : ", response.data.memos)
                    setMemos(response.data.memos.map(memo => ({
                        roomId: memo._id,
                        doc: memo.content,
                        title: memo.title,
                        shareUserCount: memo.howManyShare,
                        updatedTime: memo.updateTime,
                        isBookMark: memo.bookmarked
                    })
                    ))
                } else {
                    alert('Couldnt get memo`s lists')
                }
            })


    }, [beReload])


    useEffect(() => {
        setTimeout(() => {
            setTimeToList(true)
        }, 350)

    }, [])


    useEffect(() => {
        (() => {
            socket.on('newUser', (email) => {
                if (currentUser === null) {
                    setTimeout(() => {
                        setBeRealod(beReload => !beReload)
                    }, 250);
                }
                else if (email === currentUser.email) {
                    console.log(email)
                    setTimeout(() => {
                        setBeRealod(beReload => !beReload)
                    }, 500);

                }



            });

        })();

        return () => {
            if (!socket) return;
            setBeRealod(beReload => !beReload)
        }
    }, [])




    //컨텐츠 파싱
    useEffect(() => {
        let temp = []

        memos.map(({ roomId, doc, title, shareUserCount, updatedTime, isBookMark }) => {
            if (doc !== null) {
                let cur_list = []
                // console.log(doc)
                let jsonDoc = JSON.parse(doc)
                if (jsonDoc.content.length >= 1) {
                    // console.log(jsonDoc)
                    jsonDoc.content.map(para => {
                        if (Object.keys(para).length >= 2) {
                            // console.log(para)
                            if (para.content[0].type === "text") {
                                // console.log(para.content[0].text)
                                cur_list = [...cur_list, { "type": "text", "text": para.content[0].text }]
                            }
                            else if (para.content[0].type === "image") {
                                // console.log(para.content[0].attrs.src)

                                cur_list = [...cur_list, { "type": "image", "text": para.content[0].attrs.src }]

                            }

                        }

                    })
                    // console.log(cur_list)
                    temp.push({ roomId: roomId, title: title, shareUserCount: shareUserCount, context: cur_list, updatedTime: updatedTime, isBookMark: isBookMark })
                } else {
                    window.location.reload()
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
                <div className="footer__left">
                    <Link to="/folder">
                        <Fab size="small">
                            <FolderOpenTwoToneIcon />
                        </Fab>
                    </Link>

                </div>
                <div className="footer__right">
                    <Fab size="small" aria-label="add" className="footer__addicon" onClick={() => navigate(`/createMemo/${roomId}`, { state: { roomId, first: true, isBookMark: false } })}>
                        <AddIcon />
                    </Fab>
                </div>
            </div >

        )

    };




    const timeFormatting = (updatedTime) => {
        const time = new Date(updatedTime);
        var year = time.getFullYear();
        var month = ('0' + (time.getMonth() + 1)).slice(-2);
        var day = ('0' + time.getDate()).slice(-2);

        var dateString = year + '-' + month + '-' + day;

        var hours = ('0' + time.getHours()).slice(-2);
        var minutes = ('0' + time.getMinutes()).slice(-2);
        var seconds = ('0' + time.getSeconds()).slice(-2);

        var timeString = hours + ':' + minutes + ':' + seconds;

        return (dateString + " " + timeString);


    }



    return (

        <div className="memoList">
            {timeToList && (<Layout >
                <div style={{ width: '84%', margin: '5rem auto' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} >
                            {contents.map((memo, index) =>
                            (

                                <Grid item key={index} columns={{ xs: 4, sm: 8, md: 12 }} >

                                    <MemoRow
                                        key={memo.roomId}
                                        roomId={memo.roomId}
                                        title={memo.title}
                                        contents={memo.context}
                                        shareUserCount={memo.shareUserCount}
                                        isBookMark={memo.isBookMark}
                                        time={timeFormatting(memo.updatedTime)}
                                    />


                                </Grid>
                            )
                            )}
                        </Grid>
                    </Box>
                    <Footer />
                </div>
            </Layout>)}

        </div >
    )





}

export default MemoList


