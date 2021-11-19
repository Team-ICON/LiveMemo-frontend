import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Typography, Button, Form, message } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import * as Y from 'yjs'
import Editor from '../editor/Editor';
import { WebrtcProvider } from 'y-webrtc'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, IconButton } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { deepOrange, deepPurple } from '@mui/material/colors';
import axios from 'axios';
import UserProvider, { User } from '../../UserProvider'
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenMemo, selectOpenProvider, selectProvider, deleteProvider, selectOpenDoc } from '../../features/memoSlice';
import { v4 as uuid } from 'uuid';
import { Cookies } from "react-cookie";
import "./CreateMemo.css"

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'
import { MenuItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListItemIcon from '@mui/material/ListItemIcon';



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

    //진짜 뒤로가기 눌렀을때 저장 핸들러
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


    //뒤로가기 아이콘 눌렀을때 저장
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



    // 사용자 추가 클릭 시 Drawer 
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));


    const drawerWidth = 200;


    // three dot button
    const [anchorEl, setAnchorEl] = React.useState(null);
    const threeDotOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const ITEM_HEIGHT = 40;


    return (

        <div className="createMemo">
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader onClick={handleDrawerClose}>
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>

                </List>
                <Divider />
                <List>
                    <Avatar className="avatar_skin" sx={{ bgcolor: deepPurple[500] }}>ID</Avatar>
                </List>
            </Drawer>
            <div className="createMemo__tools">
                <div className="createMemo__toolsLeft">
                    <IconButton onClick={onSubmit}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </div>
                <div className="memo__toolsRight">
                    <IconButton onClick={addBookMark}>
                        <BookmarkIcon />
                    </IconButton>
                    <IconButton onClick={handleDrawerOpen}>
                        <GroupAddIcon color="primary" />
                    </IconButton>
                    <IconButton>
                        <MicIcon color="success" />
                    </IconButton>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-expanded={threeDotOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={threeDotOpen}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '8ch',
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <IconButton>
                                <DriveFolderUploadIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <IconButton>
                                <NotificationsIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </MenuItem>
                    </Menu>


                </div>
            </div>
            <div className="memberList">
                <Avatar className="avatar_skin" sx={{ bgcolor: deepPurple[500] }}>ID</Avatar>
            </div>
            <UserProvider.Provider value={currentUser}>
                <Editor documentId={state}
                    onFetch={handleFetch}
                    onSave={handleSave}
                />
            </UserProvider.Provider>




        </div>
    )
}

export default CreateMemo
