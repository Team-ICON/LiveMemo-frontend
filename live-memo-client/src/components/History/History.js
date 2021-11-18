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

const message = `공지 확인 바랍니다. `;


function History() {
    return (
        <div className="header">
            <div className="createMemo">
                <div className="createMemo__tools">
                    <Link to="/">
                        <IconButton>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    </Link>
                </div>

                <div className="history__body">
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>ID</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography>{message}</Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default History;