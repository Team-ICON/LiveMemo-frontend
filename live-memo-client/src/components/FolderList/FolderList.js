import React from "react";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import {
    Link,
} from "react-router-dom";


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



function FolderList() {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [fileName, setFileName] = useState("");

    const handleFileNameChange = (e) => {
        setFileName(e.target.value);
    }

    return (
        <div className="memoList">
            <div className="header">
                <div className="createMemo__tools">
                    <Link to="/">
                        <IconButton>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    </Link>
                </div>
            </div>


            <div className="emailList__list">
                {itemData.map((item) => (
                    <ImageButton
                        focusRipple
                        key={item.title}
                    >
                        <ImageSrc style={{ backgroundImage: `url(${item.url})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                {item.title}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                ))}
            </div>

            <div className="footer__right">
                <IconButton onClick={handleClickOpen}>
                    <FolderOpenIcon fontSize='large' />
                </IconButton>
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
                            onChange={handleFileNameChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setFileName("");
                            if (fileName === "") {
                                handleClose();
                                return;
                            }
                            itemData.push({
                                title: fileName,
                            });
                            handleClose();
                        }}>생성</Button>
                        <Button onClick={handleClose}>취소</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}


const itemData = [
    {
        // url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        // url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burgers',
    },
    {
        // url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
];


export default FolderList;