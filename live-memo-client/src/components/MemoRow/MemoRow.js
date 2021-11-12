import React, { forwardRef } from 'react'
import { Checkbox } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { selectMemo } from "../../features/memoSlice"
import "./MemoRow.css"

const MemoRow = forwardRef(({ roomId, contents, time }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openMemo = () => {
        dispatch(selectMemo({
            roomId
        })

        )
        navigate("/memo")
    }
    ///여기서 doc 형태에 들어갈 json으로 리덕스로 set해주고 app에가서 찾은다음에 메모에 그거 보내버림 prop으로

    return (
        <div onClick={openMemo} className="memoRow">
            <div className="memoRow__options">
                <Checkbox />
            </div>

            <div className="memoRow__message">
                <h4>
                    {contents}
                </h4>
            </div>
            <p className="memoRow__time">
                {time}
            </p>
        </div>
    )
})

export default MemoRow
