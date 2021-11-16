import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Typography, Button, Form, message } from 'antd';
import { useNavigate } from 'react-router';
import * as Y from 'yjs'
import Editor from '../editor/Editor';
import { WebrtcProvider } from 'y-webrtc'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
const token = window.localStorage.getItem('livememo-token');
const api = axios.create({
    baseURL: 'http://localhost:5000/api/memo',
    headers: { 'Content-Type': 'application/json',
              'authorization' : token ? `Bearer ${token}` : '' }
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

    // const handleSave = useCallback(async (_id, body) => {
    //     try {
    //         console.log(_id, body)
    //         let result = await api.put("createMemo", {
    //             _id,
    //             body,
    //         });
    //         console.log(`result in handleSave at CreateMemo.js`, result);
    //         newRoomId = result.data.roomId;
    //         setCurRoomId(newRoomId);
    //     } catch(err) {
    //         console.log(`err in handleSave at CreateMemo.js`, err);
    //     }
    // }, []);

    const handleFetch = useCallback(async id => {
        try {
            const response = await api.get(`getMemo/${id}`)
            return response.data.newMemo.body;

        } catch (err) {
            console.log(`handleFetch err At CreateMemo.js `, err);
            console.log("null body");
            return firstState;
        }
    }, []);


    const onSubmit = (event) => {
        event.preventDefault();
        const findMemoId = selectedProvider.documentId
        console.log("이거야: ", selectedProvider.documentId)
        console.log("찾았다", selectedDoc)
        handleSave(findMemoId, JSON.stringify(selectedDoc.docState))
        // console.log(JSON.stringify(selectedDoc.docState))

        // history.back()

        selectedProvider.newProvider.destroy();
        dispatch(deleteProvider())

        navigate("/")


    }



    // console.log("현재 룸 넘버: ", curRoomId)

    return (
        <div className="createMemo">
            <div className="createMemo__tools">
                <div className="createMemo__toolsLeft">
                    <IconButton onClick={onSubmit}>
                        <ArrowBackIosNewIcon />
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
