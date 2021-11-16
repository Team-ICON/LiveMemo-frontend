import React from "react";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

import {
    Link,
} from "react-router-dom";

const message = `공지 확인 바랍니다. `;


function History() {
    return (
        <div>
            <Table>
                <TableHead>
                    <Link to="/">
                        <IconButton>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    </Link>
                </TableHead>
                <TableBody>
                    <TableCell align="center">
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar>ID</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography>{message}</Typography>
                            </Grid>
                        </Grid>
                    </TableCell>
                </TableBody>
                <TableBody>
                    <TableCell align="center">
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar>ID</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography>{message}</Typography>
                            </Grid>
                        </Grid>
                    </TableCell>
                </TableBody>
                <TableBody>
                    <TableCell align="center">
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar>ID</Avatar>
                            </Grid>
                            <Grid item xs>
                                <Typography>{message}</Typography>
                            </Grid>
                        </Grid>
                    </TableCell>
                </TableBody>
            </Table>
        </div>

    );
}

export default History;