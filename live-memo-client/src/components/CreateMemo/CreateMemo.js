import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Typography, Button, Form, message } from 'antd';
import { useNavigate } from 'react-router';
import * as Y from 'yjs'
import Editor from '../editor/Editor';
import { WebrtcProvider } from 'y-webrtc'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import UserProvider, { User } from '../../UserProvider'
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenMemo, selectOpenProvider, selectProvider, deleteProvider, selectOpenDoc } from '../../features/memoSlice';
import { v4 as uuid } from 'uuid';

import "./CreateMemo.css"

const { Title } = Typography;
const api = axios.create({
    baseURL: 'http://localhost:5000/api/memo',
    headers: { 'Content-Type': 'application/json' },
});

const firstState = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"
function CreateMemo({ roomId, currentUser }) {
    const [curRoomId, setCurRoomId] = useState(roomId)
    const navigate = useNavigate()
    const selectedMemo = useSelector(selectOpenMemo)
    const selectedProvider = useSelector(selectOpenProvider)
    const selectedDoc = useSelector(selectOpenDoc)
    const dispatch = useDispatch()

    const handleSave = useCallback(async (_id, body) => {
        console.log(_id, body)
        await api.put("createMemo", {
            _id,
            body,
        });
    }, []);

    const handleFetch = useCallback(async id => {
        const response = await api.get(`getMemo/${id}`)
        if (response.data.memInfo == null) {
            console.log("null body")
            return firstState
        }
        else {

            return response.data.memInfo.body;

        }
    }, []);


    const onSubmit = (event) => {
        event.preventDefault();
        const findMemoId = selectedProvider.documentId
        console.log("이거야: ", selectedProvider.documentId)
        console.log("찾았다", selectedDoc)
        handleSave(findMemoId, JSON.stringify(selectedDoc.docState))
        // console.log(JSON.stringify(selectedDoc.docState))


        selectedProvider.newProvider.destroy();
        dispatch(deleteProvider())

        navigate("/")

    }
    useEffect(() => {
        setCurRoomId(uuid())

    }, [])

    // console.log("현재 룸 넘버: ", curRoomId)

    return (
        <div className="createMemo">
            <div className="createMemo__tools">
                <div className="createMemo__toolsLeft">
                    <IconButton onClick={onSubmit}>
                        <ArrowBackIcon />
                    </IconButton>


                </div>
                <div className="memo__toolsRight">
                    <IconButton>
                        <PushPinIcon />
                    </IconButton>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>

                </div>

            </div>

            <div className="createMemo__body">


                <UserProvider.Provider value={currentUser}>

                    <div >


                        <Editor documentId={selectedMemo ? selectedMemo.roomId : curRoomId}

                            onFetch={handleFetch}
                            onSave={handleSave}


                        />


                    </div>
                </UserProvider.Provider>


            </div>


        </div>
    )
}

export default CreateMemo
