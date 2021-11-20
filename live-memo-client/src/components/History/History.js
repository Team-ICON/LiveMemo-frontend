import React from "react";
import Layout from "../Layout/Layout"
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import "./History.css"

import {
    Link,
} from "react-router-dom";

const message = `공지 사항을 확인해주세요! `;
const time = `2021-11-21 03:05`;


function History() {
    return (
        <div className="history">
            <div className="history__header">
                <Link to="/">
                    <IconButton>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Link>
            </div>

            <div className="history__body">
                <div className="wrapper">
                    <div className="history_avatar">
                        <Avatar>ID</Avatar>
                    </div>
                    <div className="history_msg">
                        <Typography variant="body2">{message}</Typography>
                    </div>
                    <div className="history_time">
                        <Typography variant="body2">{time}</Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;