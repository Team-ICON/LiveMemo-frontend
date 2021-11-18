import React, { forwardRef } from 'react'
import { Checkbox } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { selectMemo } from "../../features/memoSlice"
import "./MemoRow.css"
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';

const MemoRow = ({ roomId, contents, time }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(roomId, contents, time)
    const openMemo = () => {
        dispatch(selectMemo({
            roomId
        })

        )
        navigate(`/createMemo/${roomId}`, { state: roomId })
    }
    ///여기서 doc 형태에 들어갈 json으로 리덕스로 set해주고 app에가서 찾은다음에 메모에 그거 보내버림 prop으로

    const rendercontent = contents.map((content) => {
        return <div>
            <p>{content}</p>
        </div>
    })

    return (
        <Card
            hoverable
            style={{ width: 370, marginTop: 16 }}
            onClick={openMemo}
        >
            {/* <Meta
            avatar={
                <Avatar src={blog.writer.image} />
            }
            title={blog.writer.name}
            description="This is the description"
        /> */}
            <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                {rendercontent}
            </div>
        </Card>

    )
}

export default MemoRow
