import { PropsWithChildren, useMemo } from "react";


import { Avatar, IconButton } from "@mui/material"
import { useNavigate } from 'react-router';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import AppsIcon from '@mui/icons-material/Apps';
import { selectMemoIsOpen } from "../../features/memoSlice"
import AppBar from '@mui/material/AppBar';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';

import "./Layout.css"
const Header = () => {
    return (
        <div className="header">
            <div className="header__left">
                <IconButton>
                    <MenuIcon />
                </IconButton>

            </div>

            <div className="header__right">


                <Avatar />
            </div>


        </div>
    )
}
const Footer = () => {


    const navigate = useNavigate()
    return (
        <div className="footer">
            <div className="footer__right">
                <IconButton>
                    <AddCircleOutlineTwoToneIcon className="footer__addicon" onClick={() => navigate("/createMemo")} />
                </IconButton>
            </div>
        </div>

    )

};

const Layout = ({ children }) => {

    return (
        <div>
            <Header />
            {children}
            <Footer />

        </div>
    );
};

export default Layout;