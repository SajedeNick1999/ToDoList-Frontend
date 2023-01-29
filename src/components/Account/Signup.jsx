import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import  Grid  from "@mui/material/Grid";
import  TextField  from "@mui/material/TextField";

import { Layout } from "./Layout";
import { signup } from "../../api/AccountAPI";

function Signup(props){
    const navigate = useNavigate();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        // console.log(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // console.log(e.target.value);
    }
    const handleFirstnameChange = (e) => {
        setFirstname(e.target.value);
        // console.log(e.target.value);
    }
    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
        // console.log(e.target.value);
    }

    const signupApiCall = () => {
        // let data = new FormData();
        // data.append("username", username);
        // data.append("password", password);
        // console.log('data.username:', data.get('username'));
        // console.log('data.password:', data.get('password'));
        let data = {
            userName : username,
            password : password,
            firstName : firstname,
            lastName : lastname,

        };
        signup(data,navigate,props.setSnackbarInfo);
    }

    return(
        <>
            <Layout>
            <Grid  
                    justifyContent="center" 
                    sx={{
                        width:'100%', height:'98%',
                        mt:0.5, mr:1, p:8, 
                        backgroundColor:'#e0f7fa', 
                        border:1, borderRadius:2, borderColor:'#e0f7fa'
                    }}
                >   
                    <Typography variant="h5" fontWeight='bold' component="div" align="center" >
                         ثبت نام در تسکدان
                    </Typography>
                    <TextField
                        fullWidth
                        id="qualitative_info"
                        label="نام کاربری"
                        sx={{mt:4}}
                        // value={qualitative_info}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        fullWidth
                        id="qualitative_info"
                        label="نام"
                        sx={{mt:1}}
                        // value={qualitative_info}
                        onChange={handleFirstnameChange}
                    />
                    <TextField
                        fullWidth
                        id="qualitative_info"
                        label="نام خانوادگی"
                        sx={{mt:1}}
                        // value={qualitative_info}
                        onChange={handleLastnameChange}
                    />
                    <TextField
                        fullWidth
                        id="qualitative_info"
                        label="رمز عبور"
                        sx={{mt:1}}
                        type="password"
                        // value={qualitative_info}
                        onChange={handlePasswordChange}
                    />
                    <Grid container justifyContent="center" alignItems="center">
                        <Button
                            type="submit"
                            color='success'
                            variant="contained"
                            onClick={()=>{signupApiCall()}}
                            sx={{
                                mt:1,
                                mb:1,
                                width:'55%',
                                height:50,
                            }}
                        >ثبت نام</Button>
                        <Grid item>
                            <Typography variant="caption" fontWeight='bold' component="div" sx={{width:'100%', p:1, pb:0}}>
                            قبلا ثبت نام کرده اید؟
                            </Typography>
                        </Grid>
                        <Button
                            color='primary'
                            variant="contained"
                            onClick={()=>{navigate('/Login');}}
                            sx={{
                                width:'55%',
                                height:50
                            }}

                        >ورود</Button>
                    </Grid>
                </Grid>    
            </Layout>
        </>
    );
}

export{
    Signup,
};