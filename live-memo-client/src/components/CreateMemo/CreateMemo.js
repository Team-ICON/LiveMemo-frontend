import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Typography, Button, Form, message } from 'antd';
import { useNavigate, useLocation } from 'react-router';
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
import { Cookies } from "react-cookie";


import "./CreateMemo.css"

const { Title } = Typography;
const cookies = new Cookies();
const token = cookies.get('livememo-token');
const api = axios.create({
    baseURL: 'http://localhost:4000/api/memo',
    headers: {
        'Content-Type': 'application/json',
        'authorization': token ? `Bearer ${token}` : ''
    }
});

const firstState = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"
function CreateMemo({ currentUser }) {
    // const [curRoomId, setCurRoomId] = useState(roomId)
    const { state } = useLocation()
    const navigate = useNavigate()
    const selectedProvider = useSelector(selectOpenProvider)
    const selectedDoc = useSelector(selectOpenDoc)

    const handleSave = useCallback(async (_id, body) => {
        console.log(_id, body)

        await api.put("/createMemo", {
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
            console.log("createMemo 67 ", response)
            return response.data.memInfo.content;

        } catch (err) {
            console.log(`handleFetch err At CreateMemo.js `, err);
            console.log("null body");
            return firstState;
        }
    }, []);

    //뒤로가기 핸듣러
    function popstateHandler() {

        handleSave(state, JSON.stringify(selectedDoc.docState))

        selectedProvider.newProvider.doc.destroy();

        navigate('/', { replace: true })
        window.location.reload()
        // console.log(window.location.pathname)
        // window.history.pushState(null, null, window.location.pathname);
    }
    useEffect(() => {
        window.addEventListener('popstate', popstateHandler, false);
        return () => {
            window.removeEventListener('popstate', popstateHandler)
        }
    }, [selectedProvider, selectedDoc]) //바뀐거 계속 확인



    const onSubmit = (event) => {
        event.preventDefault();
        const findMemoId = selectedProvider.documentId
        console.log("이거야: ", selectedProvider.documentId)
        console.log("갖고옴", selectedDoc)

        handleSave(findMemoId, JSON.stringify(selectedDoc.docState))
        // console.log(JSON.stringify(selectedDoc.docState))

        // history.back()
        // console.log(selectedProvider.newProvider.doc)
        // selectedProvider.newProvider.doc.destroy();

        selectedProvider.newProvider.doc.destroy();
        // dispatch(deleteProvider())
        // window.history.back()
        setTimeout(() => {
            navigate('/', { replace: true })
        }, 250);
        // window.history.pushState(null, null, window.location.pathname);


    }
    const addBookMark = (event) => {
        event.preventDefault();
        const findMemoId = selectedProvider.documentId
        console.log("이거야: ", findMemoId)

        api.post("/addbookmark", {
            memoId: findMemoId
        })



    }


    //현재 룸 체크
    useEffect(() => {
        console.log(state)

    }, [state])

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
                    <IconButton onClick={addBookMark}>
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
                        <Editor documentId={state}

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
