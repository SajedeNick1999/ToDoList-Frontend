import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import  Grid  from "@mui/material/Grid";
import  TextField  from "@mui/material/TextField";

import { Layout } from "./Layout";
import { login } from "../../api/AccountAPI";

function Login(props){
    const navigate = useNavigate();
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        // console.log(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // console.log(e.target.value);
    }

    const loginApiCall = () => {
        let data = {
            username : username,
            password : password,
        };
        login(data,navigate,props.setSnackbarInfo);
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
                         ورود به تسکدان
                    </Typography>
                    <TextField
                        fullWidth
                        id="qualitative_info"
                        label="نام کاربری"
                        sx={{mt:10}}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        fullWidth
                        id="qualitative_info"
                        label="رمز عبور"
                        sx={{mt:2}}
                        type="password"
                        onChange={handlePasswordChange}
                    />
                    <Grid container justifyContent="center">
                        <Button
                            type="submit"
                            color='success'
                            variant="contained"
                            sx={{
                                mt:3,
                                mb:5,
                                width:'55%',
                                height:50,
                            }}
                            onClick={()=>{loginApiCall();}}
                        >ورود</Button>
                        <Typography variant="caption" fontWeight='bold' component="div" align="center" >
                         نام کاربری و رمز عبور ندارید؟
                        </Typography>
                        <Button
                            color='primary'
                            variant="contained"
                            onClick={()=>{navigate('/Signup');}}
                            sx={{
                                width:'55%',
                                height:50
                            }}
                        >ثبت نام</Button>
                    </Grid>
                </Grid>    
            </Layout>
            
        </>
    );
}

export{
    Login,
};