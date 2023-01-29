import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TextField from '@mui/material/TextField';
import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';


import { Layout } from "./Layout";
import { update } from '../../api/ToDoListAPI';

function ListPage (props){
    const [listdata, setListData] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const location = useLocation();
    const list = location.state.list;
    console.log(listdata);
    useEffect(()=>{
        setListData(list.items);
        console.log('here');
      },[]);
    
    const onChange = (e) =>{
        setInputVal(e.target.value);
    };

    const handleClick = () => {
        
        if (!isEdited) {
            setListData([...listdata,{ title: inputVal, isDone: false , description:'' ,children:[]}]);
        } else {
            setListData([...listdata, { title: inputVal, isDone: false, description:'' ,children:[]}]);
        }
        setInputVal("");
        setIsEdited(false);
        
        console.log(listdata);

        const data = {
            id : list.id,
            title : list.title,
            ownerUsername : list.ownerUsername,
            validUsers : list.validUsers,
            items : listdata,
        };
        console.log(data);
        update(data,props.setSnackbarInfo);
    };

    const onDelete = (title) => {
        const newTodos = listdata.filter((todo) => todo.title !== title);
        setListData(newTodos);
    };

    const handleEdit = (title) => {
        const newTodos = listdata.filter((todo) => todo.title !== title);
        const editVal = listdata.find((todo) => todo.title === title);
        setInputVal(editVal.title);
        setListData(newTodos);
        setIsEdited(true);
      };

    const handleDone = (title) => {
        const updated = listdata.map((todo) => {
          if (todo.title === title) {
            todo.isDone = !todo.isDone;
          }
          return todo;
        });
        setListData(updated);
    };

    return(
        <Layout>
        <Grid container alignItems='flex-start' justifyContent='space-between' sx={{overflow:'auto', height:"100%", p:2}}>
                <Grid sx={{width:'25%', height:'100%'}}>
                    <Grid item xs={12} md={12} sx={{textAlign:'center',backgroundColor: '#3b70a4', height:50 ,p:1,mb:3 ,fontWeight:'bold', fontSize:'20px',color:'white'}} >
                    {list.title}
                    </Grid>
                    <Typography sx={{mb:2}}>افراد مشترک در این لیست: </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                            <ListItemAvatar>
                            <Avatar  sx={{ bgcolor: blue[500] }} >
                                {list.ownerUsername[0]}
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={list.ownerUsername} secondary="مالک" />
                        </ListItem>
                        {list.validUsers.map((persone)=>(  
                            <React.Fragment key={persone}>
                                {persone===localStorage.getItem('username')?<></>:
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar  >
                                        {persone[0]}
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={persone} secondary="مشترک" />
                                </ListItem>
                                }                          
                                
                            </React.Fragment>
                        ))}
                    </List>
                    
                    
                    
                </Grid>
                
                <Divider orientation="vertical">
                </Divider>

                <Grid sx={{width:'65%', height:'100%'}}>
                    <Grid item xs={12} md={12} sx={{width:'100%',textAlign:'center',mb:3  ,fontWeight:'bold', fontSize:'20px',color:'white'}} >
                        <TextField
                            variant="outlined"
                            onChange={onChange}
                            label="نام تسک"
                            value={inputVal}
                            sx={{width:'85%', mt:0}}
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: "right" },
                                }
                            }}
                        />
                        <Button
                            size="large"
                            variant={isEdited ? "outlined" : "contained"}
                            color="primary"
                            onClick={()=>handleClick()}
                            disabled={inputVal ? false : true}
                            sx={{width:'15%', height:58}}
                        >
                            {isEdited ? "ویرایش" : "افزودن"}
                        </Button>
                    </Grid>
                    <List>
                        {listdata.map((todo) => {
                        return (
                            <>
                            <ListItem divider="bool">
                                <Checkbox
                                onClick={() => handleDone(todo.title)}
                                checked={todo.isDone}
                                />
                                <Typography
                                style={{ color: todo.isDone ? "green" : "" }}
                                key={todo.title}
                                align='right'
                                sx={{width:'90%'}}
                                >
                                {todo.title}
                                </Typography>
                                <Tooltip title="Edit">
                                    <Fab color="primary" size="small" style={{ transform: 'scale(0.7)' , }} 
                                    aria-label="checklist" 
                                    onClick={() => handleEdit(todo.title)}
                                    >
                                        <EditIcon  />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <Fab color="error" size="small" style={{ transform: 'scale(0.7)' , }} 
                                    aria-label="checklist" 
                                    onClick={() => onDelete(todo.title)}
                                    >
                                        <DeleteIcon  />
                                    </Fab>
                                </Tooltip>
                            </ListItem>
                            </>
                        );
                        })}
                    </List>
                </Grid>
            </Grid>
        </Layout>
    )
}

export {
    ListPage
}