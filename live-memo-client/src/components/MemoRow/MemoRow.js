import React, { forwardRef } from 'react'
import { Checkbox } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { selectMemo } from "../../features/memoSlice"
import "./MemoRow.css"
const MemoRow = forwardRef(({ title, contents, time }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openMemo = () => {
        dispatch(selectMemo({
            title, contents, time,
        })

        )
        navigate("/memo")
    }


    return (
        <div onClick={openMemo} className="memoRow">
            <div className="memoRow__options">
                <Checkbox />
            </div>
            <div className="memoRow__title">
                {title}
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
