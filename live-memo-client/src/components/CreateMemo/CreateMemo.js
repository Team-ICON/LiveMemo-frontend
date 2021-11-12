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
import "./CreateMemo.css"
const { Title } = Typography;
const api = axios.create({
    baseURL: 'http://localhost:5000/api/memo',
    headers: { 'Content-Type': 'application/json' },
});

const firstState = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"
function CreateMemo({ roomId, currentUser }) {

    const navigate = useNavigate()
    // const api = axios.create({
    //     baseURL: 'https://60b9308780400f00177b6434.mockapi.io/yjs-webrtc/v1/',
    //     headers: { 'Content-Type': 'application/json' },
    // });


    // var editor = new QuillEditor()

    // const onEditorChange = (value) => {
    //     setContent(value)
    //     console.log(content)
    // }

    // const onFilesChange = (files) => {
    //     setFiles(files)
    // }



    // const handleFetch = useCallback(async id => {
    //     const response = await api.get(`documents/${id}`)
    //     return response.data.body;
    // }, []);


    const handleSave = useCallback(async (_id, body) => {
        await api.put("createMemo", {
            _id,
            body,
        });
    }, []);

    const handleFetch = useCallback(async id => {
        const response = await api.get(`getMemo/${id}`)

        console.log(response.data)
        if (response.data.body == null) {
            // console.log("hi")
            return firstState
        }
        else {
            return response.data.memInfo.body;

        }
    }, []);

    // const handleSave = useCallback(async (id, body) => {
    //     await api.post(`/documents/${id}`, {
    //         id,
    //         body,
    //     });
    // }, []);





    const onSubmit = (event) => {
        event.preventDefault();

        // setContent("");

    }



    return (
        <div className="createMemo">
            <div className="createMemo__tools">
                <div className="createMemo__toolsLeft">
                    <IconButton onClick={() => navigate("/")}>
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
                        <div style={{ textAlign: 'center' }}>
                            <Title level={2} > Editor</Title>
                        </div>

                        <Editor documentId={roomId}
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
