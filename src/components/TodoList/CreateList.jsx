import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { getAllUsers } from "../../api/AccountAPI";
import { create } from "../../api/ToDoListAPI";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function CreateList (props) {
    const theme = useTheme();
    const [title,setTitle] = useState('');
    const [validUsers,setValidUsers] = useState([]);
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        getAllUsers(setUsers,props.setSnackbarInfo);
      },[]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleValidUsersChange = (event) => {
        const {
          target: { value },
        } = event;
        setValidUsers(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const createApiCall = () => {
        let data ={
            title : title,
            ownerUsername : localStorage.getItem('username'),
            validUsers : [...validUsers,localStorage.getItem('username')],
            items : [],
        };
        create(data,props.setSnackbarInfo);
        props.setUpdate(!props.update);
        props.handleCloseCreateModal();
    }

    return(
        <>
            <Grid item xs={12} md={12} sx={{textAlign:'center',backgroundColor: '#3b70a4', height:50 ,p:1,mb:3 ,fontWeight:'bold', fontSize:'20px',color:'white'}} >
                ایجاد لیست جدید
            </Grid>
            <TextField
                fullWidth
                id="qualitative_info"
                label="عنوان لیست"
                sx={{mt:1}}
                onChange={handleTitleChange}
            />
            <InputLabel id="demo-multiple-chip-label" sx={{mt:1}}>افراد دارای دسترسی</InputLabel>
            <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            fullWidth
            multiple
            value={validUsers}
            onChange={handleValidUsersChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </Box>
            )}
            MenuProps={MenuProps}
            >
            {users.map((user) => (
                <MenuItem
                key={user.username}
                value={user.username}
                style={getStyles(user.username, validUsers, theme)}
                >
                {user.username+' ('+user.firstName+' '+ user.lastName+')'}
                </MenuItem>
            ))}
            </Select>
            <Grid container justifyContent="center">
                <Button
                    type="submit"
                    color='success'
                    variant="contained"
                    sx={{
                        mt:3,
                        mb:5,
                        width:'35%',
                        height:50,
                    }}
                    onClick={()=>{createApiCall();}}
                >ایجاد</Button>
            </Grid>
            
        </>
    );
}

export {
    CreateList,
}