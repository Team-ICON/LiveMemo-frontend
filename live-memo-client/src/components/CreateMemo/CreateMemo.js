import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { v4 as uuid } from 'uuid';
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
import getRandomUserName from '../utils/getRandomUserName';
import UserProvider, { User } from '../../UserProvider'
import "./CreateMemo.css"
const { Title } = Typography;

function CreateMemo() {
    const navigate = useNavigate()

    const api = axios.create({
        baseURL: 'https://60b9308780400f00177b6434.mockapi.io/yjs-webrtc/v1/',
        headers: { 'Content-Type': 'application/json' },
    });


    const currentUser = useMemo(() => {
        const id = uuid();
        return {
            id,
            name: getRandomUserName(id)
        };
    }, []);
    // var editor = new QuillEditor()

    // const onEditorChange = (value) => {
    //     setContent(value)
    //     console.log(content)
    // }

    // const onFilesChange = (files) => {
    //     setFiles(files)
    // }



    const handleFetch = useCallback(async id => {
        const response = await api.get(`documents/${id}`);
        return response.data.body;
    }, []);

    const handleSave = useCallback(async (id, body) => {
        await api.put(`/documents/${id}`, {
            body,
        });
    }, []);





    const onSubmit = (event) => {
        event.preventDefault();

        // setContent("");

    }



    return (
        <div class="createMemo">
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

                        <Editor documentId="e575831a-e213-49e2-9092-a604d3e0f654"
                            onFetch={handleFetch}
                            onSave={handleSave}


                        />

                        <Form onSubmit={onSubmit}>
                            <div style={{ textAlign: 'center', margin: '2rem', }}>
                                <Button
                                    size="large"
                                    htmlType="submit"
                                    className=""
                                    onSubmit={onSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                </UserProvider.Provider>


            </div>


        </div>
    )
}

export default CreateMemo
