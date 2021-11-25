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

// const firstState = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"
const { Title } = Typography

const cookies = new Cookies();
const token = cookies.get('livememo-token');

// const api = axios.create({
//     baseURL: 'http://localhost:4000/api/memo',
//     headers: {
//         'Content-Type': 'application/json',
//         'authorization': token ? `Bearer ${token}` : ''
//     }
// });



function MemoList({ currentUser }) {
    const [memos, setMemos] = useState([]);
    const [contents, setContents] = useState([]);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    //새 메모를 위해 필요
    const roomId = uuid();
    useEffect(() => {
        api.get('/memo/getMemos')
            .then(response => {

                if (response.data.success) {
                    console.log("memoList 49 : ", response.data.memos)
                    setMemos(response.data.memos.map(memo => ({
                        roomId: memo._id,
                        doc: memo.content,
                        title: memo.title,
                        updatedTime: memo.updateTime,
                        isBookMark: memo.bookmarked
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

        memos.map(({ roomId, doc, title, updatedTime, isBookMark }) => {
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
                    temp.push({ roomId: roomId, title: title, context: cur_list, updatedTime: updatedTime, isBookMark: isBookMark })
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
            <Layout >
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
                                        isBookMark={memo.isBookMark}
                                        time={new Date(memo.updatedTime).toDateString()} />


                                </Grid>
                            )
                            )}
                        </Grid>
                    </Box>
                    <Footer />
                </div>
            </Layout>
        </div >
    )




}

export default MemoList


