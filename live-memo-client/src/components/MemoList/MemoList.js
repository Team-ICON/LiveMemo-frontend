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
import FlipMove from "react-flip-move"
import Layout from '../Layout/Layout'
import { v4 as uuid } from 'uuid';
import { Cookies } from "react-cookie";


import axios from "axios"
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
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
                console.log(response,"@@@@@@@@@@@@@@@@@@@");
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
                    temp.push({ roomId: roomId, context: cur_list, createdTime: createdTime, updatedTime: updatedTime })
                }
            }
        })

        setContents(temp)
    }, [memos])

    const Footer = () => {


        const navigate = useNavigate()
        // console.log(newRoomId)
        return (
            <div className="footer">
                <div className="footer__right">
                    <IconButton onClick={() => navigate(`/createMemo/${newRoomId}`, { state: newRoomId })}>
                        <AddCircleOutlineTwoToneIcon className="footer__addicon" />
                    </IconButton>
                </div>
            </div>

        )

    };


    // console.log(contents)
    return (

        <div className="memoList">
            <Layout>
                <div className="emailList__list">

                    {contents.map(({ roomId, context, createdTime }) => (
                        <MemoRow
                            key={roomId}
                            roomId={roomId}
                            contents={context}
                            time={new Date(createdTime).toDateString()} />
                        //  {/* new Date(createdAt).toDateString() */}
                    ))}



                    <Footer />

                </div>
            </Layout>
        </div>
    )


    // const renderCards = memos.map((memo) => {
    //     return <Col key={memo.roodId} lg={8} md={12} xs={24}>
    //         <Card
    //             hoverable
    //             style={{ width: 370, marginTop: 16 }}
    //             onClick={() => { navigate("/createMemo") }}
    //         >
    //             {/* <Meta
    //                 avatar={
    //                     <Avatar src={blog.writer.image} />
    //                 }
    //                 title={blog.writer.name}
    //                 description="This is the description"
    //             /> */}
    //             <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
    //                 <div dangerouslySetInnerHTML={{ __html: memo.doc }} />
    //             </div>
    //         </Card>
    //     </Col>
    // })

    // return (
    //     <div style={{ width: '85%', margin: '3rem auto' }}>
    //         <Title level={2}> Memo Lists </Title>
    //         <Row gutter={[32, 16]}>
    //             {renderCards}
    //         </Row>
    //     </div>
    // )




}

export default MemoList


