import qs from "qs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie"; 


// import { sendToken, getUserData } from "../../actions";

const GetToken = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    // const { search } = useLocation();
    // console.log(search);
    // const { token } = qs.parse(search); // 쿼리 스트링 문자열을 객체로 만들어준다. {} 고맙다 범석아
    // console.log(`qs.parse(search)`, qs.parse(search));
    // console.log(`qs.parse(search.slice(1))`, qs.parse(search.slice(1)));
    // console.log(`token`, token);
    const current = decodeURI(window.location.href);
    const search = current.split("/token/")[1];
    const token = search.substring(0, search.length - 1);
    console.log('here?')
    

    useEffect(() => {
        console.log(`token`, token);
        if (token && typeof token === "string") {
            // localStorage.setItem("livememo-token", tokencookie.setItem('livememo-token', token));
            console.log(token);
            localStorage.setItem("livememo-token", token);
            window.location.href ='/';
        }
    }, []);
    // return <Navigate to="/" push={false} />;
    return (
        <div>
            Welcome!
        </div>
    )
}
export default GetToken