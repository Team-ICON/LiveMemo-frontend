import React, { forwardRef } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { selectMemo } from "../../features/memoSlice"
import "./MemoRow.css"
import Paper from '@mui/material/Paper';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { IconButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';


import { experimentalStyled as styled } from '@mui/material/styles';

const MemoRow = ({ roomId, title, contents, shareUserCount, isBookMark, time }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openMemo = () => {


        navigate(`/createMemo/${roomId}`, { state: { roomId, first: false, isBookMark: isBookMark } })
    }
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        height: 150, overflowY: 'scroll', marginTop: 10,
        color: theme.palette.text.secondary,
    }));



    return (
        <Paper

            style={{ width: 300, }}
            onClick={openMemo}
        >
            {/* <Meta
            avatar={
                <Avatar src={blog.writer.image} />
            }
            title={blog.writer.name}
            description="This is the description"
        /> */}
            <Item>
                <div className="memoRow__header">
                    <p className="memoRow__title">{title}</p>
                    <div className="memoInfo">
                        <div className="memoRow__icons">
                            <div className="userCnt_info">
                                <PeopleIcon style={{ color: 'black' }} />
                                <p className="userCnt">{shareUserCount}</p>
                            </div>
                            {isBookMark ?
                                <BookmarkIcon style={{ color: 'orange' }} /> : null}
                        </div>
                        <div className="memoRow__time">
                            {time}
                        </div>
                    </div>
                </div>
                <hr />
                {contents.map((content, index) => (
                    <div key={index}>
                        {content.type === 'text' ? (<p> {content.text}</p>) : (<img src={content.text} width="50%" />)}
                    </div>
                ))}
            </Item>
        </Paper>

    )
}

export default MemoRow
