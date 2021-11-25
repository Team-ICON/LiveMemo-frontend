import React from "react";
import { Avatar, IconButton } from "@mui/material"
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/userSlice"
import { MenuItem } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';

import "./Layout.css"
const Header = () => {

    const user = useSelector(selectUser)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const logOutOpen = Boolean(anchorEl);
    const ITEM_HEIGHT = 20;


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        
    };

    const handleClose = () => {
        setAnchorEl(null);
        
    };

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem('livememo-token');
        window.location.href = "/";
    }

    return (
        <div className="header">
            <IconButton className="header__right" onClick={handleClick}>
                <Avatar src={user?.picture} />
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
                <MenuItem onClick={handleLogout}>
                    <IconButton>
                        <LogoutIcon style= {{ color : 'black' }} />
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