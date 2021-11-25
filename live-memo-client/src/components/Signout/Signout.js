import React, { useEffect } from "react";
import { api } from "../../axios";


const Signout = () => {
    //const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('livememo-token');
        const signout = async() => {
            try {
                const res = await api.get('auth/signout');
                if (res.status === 200) {
                    window.localStorage.removeItem("token");
                    window.sessionStorage.removeItem("insk_un");
                }
            } catch(err) {
                console.log(err);
            }
        }
            
        signout();
        window.location.href = "/";
    })

    return(
        <>
            <div>Loading to SignOut.. see you later</div>
        </>
    )
}

export default Signout;