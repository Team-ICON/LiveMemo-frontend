import React, { PropsWithChildren, useMemo } from "react";


import { Avatar, IconButton } from "@mui/material"
import { useNavigate } from 'react-router';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import AppsIcon from '@mui/icons-material/Apps';
import { selectMemoIsOpen } from "../../features/memoSlice"
import AppBar from '@mui/material/AppBar';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import { selectUser } from "../../features/userSlice"
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MenuItem } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone';

import {
    Link,
} from "react-router-dom";

import "./Layout.css"
const Header = () => {

    const user = useSelector(selectUser)
    const drawerWidth = 140;
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const logOutOpen = Boolean(anchorEl);
    const ITEM_HEIGHT = 20;


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className="header">
            <IconButton className="header__right" onClick={handleClick}>
                <Avatar src={user?.picture}>ID</Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={logOutOpen}
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
                        <LogoutIcon />
                    </IconButton>
                </MenuItem>
            </Menu>
        </div >
    )
}


const Layout = ({ children }) => {

    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default Layout;