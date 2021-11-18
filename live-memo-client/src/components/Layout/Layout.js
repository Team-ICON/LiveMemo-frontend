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

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MenuItem } from "@mui/material";
import {
    Link,
} from "react-router-dom";

import "./Layout.css"
const Header = () => {
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

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <div className="header">
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
                    <Link to="/folder" style={{ textDecoration: 'none', color: "black" }}>
                        <MenuItem>폴더 리스트</MenuItem>
                    </Link>
                    <Link to="/history" style={{ textDecoration: 'none', color: "black" }}>
                        <MenuItem>히스토리</MenuItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    {['로그아웃'].map((text, index) => (
                        <ListItem button key={text}>
                            {/* <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon> */}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <IconButton className="header__right" onClick={handleDrawerOpen}>
                <Avatar >ID</Avatar>
            </IconButton>

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