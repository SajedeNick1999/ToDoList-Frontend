import axios from "axios";
import { GETLISTS_URL } from "../constants/routes";
import { GETLISTS2_URL } from "../constants/routes";
import { CREATELIST_URL } from "../constants/routes";
import { DELETELIST_URL } from "../constants/routes";
import { UPDATELIST_URL } from "../constants/routes";

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    GetOwend API     //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const getOwend = async (setData,setSnackbarInfo) => {
    axios.post(GETLISTS_URL, {},{withCredentials: true,} )
      .then(res => {
        console.log(res.status);
        if (res.status===200){
            console.log(res.data);
            setData(res.data);
        }
        else{
          setSnackbarInfo({
            open: true,
            message: 'مشکلی پیش آمده است. صفحه را رفرش کنید.',
            severity: 'error',
          });
        }
      })
};

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    GetVisible API     //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const getVisible = async (setData,setSnackbarInfo) => {
    axios.post(GETLISTS2_URL, {},{withCredentials: true,} )
      .then(res => {
        console.log(res.status);
        if (res.status===200){
            console.log(res.data);
            setData(res.data);
        }
        else{
          setSnackbarInfo({
            open: true,
            message: 'مشکلی پیش آمده است. صفحه را رفرش کنید.',
            severity: 'error',
          });
        }
      })
};

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    Create API     ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const create = async (data,setSnackbarInfo) => {
    axios.post(CREATELIST_URL, data,{withCredentials: true,} )
      .then(res => {
        console.log(res);
        if (res.status===200){
            setSnackbarInfo({
                open: true, 
                message: 'با موفقیت ایجاد شد.',
                severity: 'success',
            });
        }
        else{
          setSnackbarInfo({
            open: true,
            message: 'مشکلی پیش آمده است. دوباره تلاش کنید.',
            severity: 'error',
          });
        }
      })
};

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    Delete API     ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const deleteList = async (deletingListId,setSnackbarInfo) => {
    axios.post(DELETELIST_URL, null,{params:{deletingListId},withCredentials: true,} )
      .then(res => {
        console.log(res);
        if (res.status===200){
            setSnackbarInfo({
                open: true, 
                message: 'با موفقیت حذف شد.',
                severity: 'success',
            });
        }
        else{
          setSnackbarInfo({
            open: true,
            message: 'مشکلی پیش آمده است. دوباره تلاش کنید.',
            severity: 'error',
          });
        }
      })
};

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////    Update API     ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
const update = async (data,setSnackbarInfo) => {
  axios.post(UPDATELIST_URL, data,{withCredentials: true,} )
    .then(res => {
      console.log(res);
      if (res.status===200){
          setSnackbarInfo({
              open: true, 
              message: 'با موفقیت انجام شد.',
              severity: 'success',
          });
      }
      else{
        setSnackbarInfo({
          open: true,
          message: 'مشکلی پیش آمده است. دوباره تلاش کنید.',
          severity: 'error',
        });
      }
    })
};


export {
    getOwend,
    getVisible,
    create,
    deleteList,
    update,
}