// import React, { useEffect } from 'react'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { IconButton } from '@mui/material';
// import { useNavigate } from 'react-router';

// import { useSelector } from 'react-redux';
// import { selectOpenMemo } from '../../features/memoSlice';
// import PushPinIcon from '@mui/icons-material/PushPin';
// import NotificationsIcon from '@mui/icons-material/Notifications';

// import "./Memo.css"
// function Memo({ currentUser }) {

//     const navigate = useNavigate()
//     const selectedMemo = useSelector(selectOpenMemo) //이게 room_id 들어가먄됨


//     return (
//         <div className="memo">
//             <div className="memo__tools">
//                 <div className="memo__toolsLeft">
//                     <IconButton onClick={() => navigate("/")}>
//                         <ArrowBackIcon />
//                     </IconButton>


//                 </div>
//                 <div className="memo__toolsRight">
//                     <IconButton>
//                         <PushPinIcon />
//                     </IconButton>
//                     <IconButton>
//                         <NotificationsIcon />
//                     </IconButton>

//                 </div>

//             </div>
//             <div className="memo__body">
//                 {/* <div className="memo__bodyHeader">
//                     <p>{selectedMemo?.title}</p>
//                     <p className="memo__time">{selectedMemo?.time}</p>
//                 </div>

//                 <div className="memo__message">
//                     <p>{selectedMemo?.contents}</p>
//                 </div> */}


//             </div>
//         </div >
//     )
// }

// export default Memo
