import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { Cookies } from "react-cookie";
import Editor from '../editor/Editor';
import { api } from "../../axios";
import UserProvider from '../../UserProvider'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectOpenProvider, selectOpenDoc, } from '../../features/memoSlice';
import { getCurUsers } from '../../features/userSlice';
//material ui
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MicIcon from '@mui/icons-material/Mic';
import { deepPurple } from '@mui/material/colors';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { MenuItem } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import "./CreateMemo.css"

//////////////////////
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { onBackgroundMessage } from "firebase/messaging/sw";
import dotenv from "dotenv";

dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(`REACT_APP_FIREBASE_API_KEY`, process.env.REACT_APP_FIREBASE_API_KEY);
console.log(`FIREBASE_API_KEY`, process.env.REACT_APP_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "livememo-frontend.firebaseapp.com",
  projectId: "livememo-frontend",
  storageBucket: "livememo-frontend.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();


////////////



const cookies = new Cookies();
const token = cookies.get('livememo-token');

const firstState = "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\"}]}"
function CreateMemo({ currentUser, socket }) {
    // 사용자 추가 클릭 시 Drawer 
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false)
    const { state } = useLocation()
    //메모에 속한 사용자 리스트 
    const [memberList, setMemberList] = useState([]);
    //current connect member state
    const [curMemberList, setCurMemberList] = useState([])
    //bookmark
    const [isBookMark, setIsBookMark] = useState(state.isBookMark);
    //mic button
    const [isMicOn, setIsMicOn] = useState(false);
    //three dot state
    const [anchorEl, setAnchorEl] = React.useState(null);
    const threeDotOpen = Boolean(anchorEl);
    const ITEM_HEIGHT = 40;
    const [memoTitle, setMemoTitle] = useState("");
    const navigate = useNavigate()
    const selectedProvider = useSelector(selectOpenProvider)
    const selectedDoc = useSelector(selectOpenDoc)
    const CurUserList = useSelector(getCurUsers)
    const dispatch = useDispatch()
    let searchEmail = "";



    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleThreeDotClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleThreeDotClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };


    const handleSave = useCallback(async (_id, body, quit) => {
        await api.put("/memo/createMemo", {
            _id,
            title: memoTitle,
            body,
            quit,
            first: state.first
        }).then(res => {
        });
    }, [memoTitle]);

    //플래그로 나눠놓은 이유 get일때 가져오는거랑 create일때랑 거의 같아서, getMemo를 하면서 창을 불러낼때 fetch를 먼저 하는거 말고 create랑 같음
    const handleFetch = useCallback(async id => {
        try {
            setCurMemberList([])
            if (state.first) {
                handleSave(state.roomId, JSON.stringify(firstState), true);
                // const res = await api.post("/memo/setCurUser", {
                //     userId: currentUser._id,
                //     roomId: id
                // }).then(res => {
                // });
                return firstState;
            }
            else {
                const res = await api.get(`/memo/getMemo/${id}`);
                const curMem = res.data.roomsStatus[id]
                setMemoTitle(res.data.memInfo.title);
                setMemberList(res.data.memInfo.userList);

                if (curMem.length == 1)
                    return res.data.memInfo.content;
                else {
                    return firstState
                }

            }
        } catch {
            console.log("못가져옴");
        }

    }, []);

    //새로고침 핸들러
    const beforeunloadHandler = (event) => {
        event.preventDefault();
        handleSave(state.roomId, JSON.stringify(selectedDoc.docState), false)

        selectedProvider.newProvider.disconnect();
        selectedProvider.newProvider.destroy();

        event.returnValue = ""
    }
    useEffect(() => {
        window.addEventListener('beforeunload', beforeunloadHandler);
        return () => {
            window.removeEventListener("beforeunload", beforeunloadHandler);
        };
    }, []);



    //진짜 뒤로가기 눌렀을때 저장 핸들러
    function popstateHandler() {
        handleSave(state.roomId, JSON.stringify(selectedDoc.docState), true)


        selectedProvider.newProvider.disconnect();
        selectedProvider.newProvider.destroy();
        navigate('/', { replace: true })

    }
    useEffect(() => {
        window.addEventListener('popstate', popstateHandler, false);
        return () => {
            window.removeEventListener('popstate', popstateHandler)
        }
    }, [selectedProvider, selectedDoc]) //바뀐거 계속 확인

    //뒤로가기 아이콘 눌렀을때 저장
    const onSubmit = async (event) => {
        event.preventDefault();

        handleSave(state.roomId, JSON.stringify(selectedDoc.docState), true)

        selectedProvider.newProvider.disconnect();
        selectedProvider.newProvider.destroy();

        navigate('/', { replace: true })


    }

    const addBookMark = (event) => {
        event.preventDefault();
        setIsBookMark(true)
        const findMemoId = selectedProvider.documentId
        api.post("/memo/addbookmark", {
            memoId: findMemoId
        }).then((response) => {
            console.log(response)
        })
    }
    const removeBookMark = (event) => {
        event.preventDefault();
        setIsBookMark(false)
        const findMemoId = selectedProvider.documentId
        api.post("/memo/removebookmark", {
            memoId: findMemoId
        }).then((response) => {
            console.log(response)
        })
    }

    const deleteMemo = (event) => {
        event.preventDefault();
        const findMemoId = selectedProvider.documentId
        api.post("/memo/delete", {
            memoId: findMemoId
        }).then(response => { console.log(response) })


        // const ret = curMemberList.filter(member => member.email !== currentUser)
        // setCurMemberList(ret)

        selectedProvider.newProvider.disconnect();
        selectedProvider.newProvider.destroy();

        setTimeout(() => {
            navigate('/', { replace: true })

        }, 350);

    }

    //실시간 유저 변경
    useEffect(() => {

        if (CurUserList) {
            // curUserUpdate(CurUserList)
            setCurMemberList([...CurUserList])

        }

        return () => {
            //     // let list = curMemberList.filter(member => member.email !== currentUser)
            //     // console.log("curMemberList", curMemberList)
            //     // console.log("CurUserList", CurUserList)
            setCurMemberList([])

        }

    }, [CurUserList])

    //for push alarm
    const sendNotification = async () => {
        const title = document.getElementById('title').value
        const msg = document.getElementById('message').value

        let targetFcmTokenList = []
        // api서버로부터 해당 메모의 userlist에 있는 유저들의 토큰 요청하기(본인 제외)
        // method : POST
        // api.POST('/push/fcmTokenList')

        await api.post("/push/fcmTokenList", {
            memoId: state.roomId
        }).then(res => {
            targetFcmTokenList = res.data.fcmTokenList
        });

        
        // 각 유저마다 push 보내기
        let result = targetFcmTokenList.map(fcmToken => {
            let body = {
                    to: fcmToken,
                    notification: {
                    title: title,
                    body: msg
                }
            }

            let options = {
                method : "POST",
                headers: new Headers({
                Authorization:"key=AAAA4sQcU_I:APA91bEqamNYS8VueqCFncNdPGEQqEsRdTuKM3vyj7nJIlcVUfceWocALD-mQrxba6plVRkRJMCXwmc0rLqgfneJQpuIOIKnViwzq_xnmsbF_c2auVxq371NWL1S8OgsbOaW2iAxGGyo",
                'Content-Type': 'application/json'
            }),
                body: JSON.stringify(body)
            }

            fetch("https://fcm.googleapis.com/fcm/send", options).then(res=>{
                console.log(`SENT`);
                console.log(res);
            })
            return 1;
        })

        handleDialogClose()
    }



    //E-Mail로 사용자 검색을 위한 API
    const addUser = (event) => {
        event.preventDefault();
        api.post('/memo/addUser', { userEmail: searchEmail, memoId: selectedProvider.documentId })
            .then(response => {
                if (response.data.success) {
                    setMemberList([...memberList, response.data.userdata]);
                }
            }).catch(error => { alert("메일 주소를 확인해주세요."); });

        socket.emit('newUser', searchEmail);
    }


    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));
    // 사용자 검색 기능
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '60vw',

        },
    }));
    const handleChange = (e) => {
        searchEmail = e.target.value;
    }
    //제목 수정
    const handleTitleNameChange = (e) => {
        setMemoTitle(e.target.value);
    }

    // 음소거 버튼 js 스크립트 by jinh

    const toggleMute = (event) => {
        event.preventDefault();
        // 버튼 상태: 로몬형 왈, 토글을 어떻게 구현할건지한다음 적용할것
        // 그렇기때문에 여기서는 그냥 true/ false로 임시로 지정해서 구분
        // audio-tags 가져옴
        const audioTags = document.querySelectorAll("div#audio-boxes audio");

        if (isMicOn) {
            // 음소거 해야할 경우
            for (let i = 0; i < audioTags.length; i++) {
                audioTags[i].muted = true;
            }
        }
        else {
            // 음소거 해제해야 할 경우
            for (let i = 0; i < audioTags.length; i++) {
                audioTags[i].muted = false;
            }
        }

        setIsMicOn((isMicOn) => !isMicOn)

    }



    return (
        <div className="createMemo">
            <Drawer
                sx={{
                    width: window.innerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: window.innerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={drawerOpen}
            >
                <DrawerHeader>
                    <div className='icon__left'>
                        <IconButton onClick={handleDrawerClose}>
                            <CloseIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>

                    <div className='icon__right'>
                        <GroupAddIcon style={{ color: 'white' }} />
                    </div>
                </DrawerHeader>
                <Divider />
                <List>
                    <div className="searchUser">
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="사용자 메일을 입력해주세요."
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleChange}
                            />
                        </Search>
                        <button className="addButton" onClick={addUser}>
                            Add
                        </button>
                    </div >

                </List>
                <Divider />
                <div>
                    {memberList.map((item, index) => (
                        <List key={index}>
                            <div className="userList" key={index}>
                                <Avatar className="avatar_skin" sx={{ bgcolor: 'deepPurple[500]' }} src={item?.picture} />
                                <div key={index} className="profileList">
                                    {item.profileName}
                                </div>
                            </div>
                        </List>
                    ))}

                </div>
            </Drawer>
            <div className="createMemo__tools">
                <div className="createMemo__toolsLeft">
                    <IconButton style={{ color: 'white' }} onClick={onSubmit}>
                        <ArrowBackIosNewIcon />
                    </IconButton>

                </div>
                <div className="memo__toolsRight">
                    {isBookMark === false && <IconButton style={{ color: 'white' }} onClick={addBookMark}>
                        <BookmarkIcon />
                    </IconButton>}
                    {isBookMark &&
                        <IconButton style={{ color: 'orange' }} onClick={removeBookMark}>
                            <BookmarkIcon />
                        </IconButton>}
                    <IconButton style={{ color: 'white' }} onClick={handleDrawerOpen}>
                        <GroupAddIcon />
                    </IconButton>
                    {isMicOn === false && <IconButton style={{ color: 'white' }} onClick={toggleMute}>
                        <MicIcon />
                    </IconButton>}
                    {isMicOn && <IconButton style={{ color: 'red' }} onClick={toggleMute}>
                        <MicIcon />
                    </IconButton>}

                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-expanded={threeDotOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleThreeDotClick}
                        style={{ color: 'white' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={threeDotOpen}
                        onClose={handleThreeDotClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '8ch',
                            },
                        }}
                    >
                        <MenuItem onClick={handleThreeDotClose}>
                            <IconButton style={{ color: 'black' }}>
                                <DriveFolderUploadIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem >
                            <IconButton onClick={handleDialogOpen} style={{ color: 'black' }}>
                                <NotificationsIcon />
                            </IconButton>
                            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                                <DialogTitle>Push Message</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To push message to other member, please enter your message here.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="title"
                                        label="Title"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        margin="dense"
                                        id="message"
                                        label="Message"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleDialogClose}>Cancel</Button>
                                    <Button onClick={sendNotification}>push</Button>
                                </DialogActions>
                            </Dialog>
                        </MenuItem>
                        <MenuItem onClick={deleteMemo}>
                            <IconButton style={{ color: 'black' }}>
                                <DeleteIcon />
                            </IconButton>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="curMemberList">
                <Avatar src={currentUser.picture} className="avatar_skin" sx={{ bgcolor: 'black' }}>ID</Avatar>
                {curMemberList.map((item, index) => (
                    // { console.log(item) }
                    <Avatar className="curMember" key={index} sx={{ bgcolor: deepPurple[400] }} src={item} />
                ))}

            </div>
            <div className="createMemo__title">
                <input placeholder="제목 없음" className="input_css" type="text" value={memoTitle}
                    onChange={handleTitleNameChange}

                />
            </div>
            <div className="createMemo__body">
                <UserProvider.Provider value={currentUser}>
                    <Editor documentId={state.roomId}
                        onFetch={handleFetch}
                        onSave={handleSave}
                    />
                </UserProvider.Provider>
            </div>
        </div >
    )
}
export default CreateMemo