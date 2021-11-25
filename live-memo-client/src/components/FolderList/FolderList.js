import React from "react";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
// import axios from "axios"
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CreateNewFolderTwoToneIcon from '@mui/icons-material/CreateNewFolderTwoTone';
import Fab from '@mui/material/Fab';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderTwoToneIcon from '@mui/icons-material/FolderTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import {
    Link,
} from "react-router-dom";
import { formControlUnstyledClasses } from "@mui/core";
import "./FolderList.css"
import { List } from "@mui/material";

import { api } from "../../axios";


const cookies = new Cookies();
const token = cookies.get('livememo-token');

// const api = axios.create({
//     baseURL: 'http://localhost:4000/api/folder',
//     headers: {
//         'Content-Type': 'application/json',
//         'authorization': token ? `Bearer ${token}` : ''
//     }
// });


const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));


const openFolder = (name) => {
    // folder open
    api.post('/open', { folderName: name })
        .then(response => {
            if (response.data.success) {
                console.log("Success Open Folder");
            }
        })
}

const deleteFolder = (name) => {
    // folder delete
    console.log(name);
    api.post('/delete', { folderName: name })
        .then(response => {
            if (response.data.success) {
                console.log("Success Delete Folder");
            }
        })

}



function FolderList() {
    const [folderName, setFolderName] = useState("");
    const [folders, setFolders] = useState([])

    useEffect(() => {
        api.get('/folder/show')
            .then(response => {
                if (response.data.success) {
                    setFolders(response.data.folders);
                } else {
                    alert('폴더가 없습니다.')
                }
            })
    }, [folders])

    const createFolder = (name) => {
        if (name === "") {
            return;
        }
        // folder create 추가
        api.post('/create', { folderName: name })
            .then(response => {
                if (response.data.success) {
                    console.log("Success Make Folder");
                }
            })

    }




    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleFolderNameChange = (e) => {
        setFolderName(e.target.value);
    }



    return (
        <div className="folderlist">
            <div className="header__folderlist">
                <div>
                    <Link to="/">
                        <IconButton style={{ color: 'white' }}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    </Link>
                </div>
            </div>

            <div className="bodyFolderList">
                {folders.map((item) => (
                    <div className="folderElem" key={item}>
                        <div className="folderElemName" onClick={() => { openFolder(item) }}>
                            <ListItemAvatar>
                                <FolderTwoToneIcon fontSize="large" />
                            </ListItemAvatar>
                            <ListItemText className="folderName"
                                primary={item}
                            />
                        </div>
                        <div className="folderElemDelete">
                            <DeleteTwoToneIcon fontSize="large" onClick={() => { deleteFolder(item) }} />
                        </div>
                    </div>
                ))}
            </div>


            <div className="footer_folderList">
                <div className="footer_folderList_right">
                    <Fab size="small" aria-label="add" className="footer__addicon" onClick={handleClickOpen} >
                        <CreateNewFolderTwoToneIcon />
                    </Fab>
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>폴더 생성</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="폴더 이름을 입력해주세요."
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleFolderNameChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            createFolder(folderName);
                            handleClose();
                        }}>생성</Button>
                        <Button onClick={handleClose}>취소</Button>
                    </DialogActions>
                </Dialog>
            </div >


        </div>
    );
}


export default FolderList;