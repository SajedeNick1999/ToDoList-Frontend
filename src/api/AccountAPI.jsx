import axios from "axios";
import { LOGIN_URL } from "../constants/routes";
import { SIGNUP_URL } from "../constants/routes";
import { GETALLUSERS_URL } from "../constants/routes";


/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    Login API     /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


const login = async (data,navigate,setSnackbarInfo) => {
    axios.post(LOGIN_URL,  data,{withCredentials: true,} )
      .then(res => {
        console.log(res.status);
        if (res.status===200){
            setSnackbarInfo({
              open: true, 
              message: 'با موفقیت لاگین شدید',
              severity: 'success',
            });
            localStorage.setItem('username',data.username);
            navigate('/List');
        }
        else{
          setSnackbarInfo({
            open: true,
            message: 'رمز عبور یا نام کاربری وارد شده اشتباه است',
            severity: 'error',
          });
        }
      })
};

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    Signup API     /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


const signup = async (data,navigate,setSnackbarInfo) => {
  axios.post(SIGNUP_URL,  data,{withCredentials: true,} )
      .then(res => {
        console.log(res.status);
        if (res.status===200){
            setSnackbarInfo({
              open: true, 
              message: 'با موفقیت ثبت نام شدید',
              severity: 'success',
            });
            navigate('/Login');
        }
        else{
          setSnackbarInfo({
            open: true,
            message: 'اشتباهی پیش آمده. دوباره تلاش کنید.',
            severity: 'error',
          });
        }
      })

};


/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    GetAllUsers API     ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


const getAllUsers = async (setUsers,setSnackbarInfo) => {
  axios.post(GETALLUSERS_URL,  {},{withCredentials: true,} )
      .then(res => {
        console.log(res.status);
        if (res.status===200){
            console.log(res.data);
            setUsers(res.data);
        }
        else{
          setSnackbarInfo({
            open: true,
            message: 'اشتباهی در دریافت لیست کاربران پیش آمده. صفحه را رفرش کنید.',
            severity: 'error',
          });
        }
      })

};


export {
    login,
    signup,
    getAllUsers,
}