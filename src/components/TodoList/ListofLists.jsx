import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Layout } from "./Layout";
import { getOwend } from '../../api/ToDoListAPI';
import { getVisible } from '../../api/ToDoListAPI';
import { CreateList } from './CreateList';
import { deleteList } from '../../api/ToDoListAPI';

const CreateStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
  };

function ListofLists(props){
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [data2,setData2] = useState([]);
    const [update,setUpdate] = useState(false);

    useEffect(()=>{
        getOwend(setData,props.setSnackbarInfo);
        getVisible(setData2,props.setSnackbarInfo);
      },[update]);

    //Create Modal
    const[createModal,setCreateModal] = useState(false);
    const handleOpenCreateModal = () => {
        setCreateModal(true);
    };
    const handleCloseCreateModal = () => {
        setCreateModal(false);
    };

    const deleteAPICall = (id) => {
        let deletingListId = id
        deleteList(deletingListId,props.setSnackbarInfo);
        setUpdate(!update);
    };

    const openList = (list) => {
        console.log(list);
        navigate('/List/items',{state:{list:list}})
    };
    

    return(
        <Layout>
            <Grid container alignItems='flex-start' justifyContent='space-between' sx={{overflow:'auto', height:"100%", p:2}}>
                <Grid sx={{width:'45%', height:'100%'}}>
                    <Grid item xs={12} md={12} sx={{textAlign:'center',backgroundColor: '#3b70a4', height:50 ,p:1,mb:3 ,fontWeight:'bold', fontSize:'20px',color:'white'}} >
                    لیست‌های شخصی
                    </Grid>
                    <Grid container spacing={1} justifyContent="center">
                        {data.map((list) => (
                            <React.Fragment key={list.id}>
                                {list.validUsers.length>1?<></>:
                                <Grid item >
                                    <Card  sx={{ width: 250}}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                            {list.title}
                                            </Typography>
                                            <Typography variant="body2">
                                            {'مالک : شما'}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Tooltip title="Open">
                                                <Fab color="success" size="small" style={{ transform: 'scale(0.7)',}} aria-label="open" onClick={()=>openList(list)}>
                                                <OpenInFullIcon  />
                                                </Fab>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Fab color="error" size="small" style={{ transform: 'scale(0.7)' , }} aria-label="checklist" onClick={(id)=>deleteAPICall(list.id)}>
                                                <DeleteIcon  />
                                                </Fab>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <Fab color="primary" size="small" style={{ transform: 'scale(0.7)' , }} aria-label="checklist" onClick={(id)=>deleteAPICall(list.id)}>
                                                <EditIcon  />
                                                </Fab>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                }
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
                
                <Divider orientation="vertical">
                    <Tooltip arrow title="Add New List">
                        <Fab color="primary" size="small" style={{ transform: 'scale(1.5)',}}  aria-label="checklist" onClick={()=>handleOpenCreateModal()}>
                            <AddIcon  />
                        </Fab>
                    </Tooltip>
                </Divider>

                <Grid sx={{width:'45%', height:'100%'}}>
                    <Grid item xs={12} md={12} sx={{width:'100%',textAlign:'center',backgroundColor: '#3b70a4', height:50 ,p:1,mb:3  ,fontWeight:'bold', fontSize:'20px',color:'white'}} >
                    لیست‌های اشتراکی
                    </Grid>
                    <Grid container spacing={1} justifyContent="center">
                        {data.map((list) => (
                            <React.Fragment key={list.id}>
                                {(list.validUsers.length<2)?<></>:
                                <Grid item >
                                    <Card  sx={{ width: 250}}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                            {list.title}
                                            </Typography>
                                            <Typography variant="body2">
                                            {'مالک : شما'}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Tooltip title="Open">
                                                <Fab color="success" size="small" style={{ transform: 'scale(0.7)',}} aria-label="open" onClick={()=>openList(list)}>
                                                <OpenInFullIcon  />
                                                </Fab>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Fab color="error" size="small" style={{ transform: 'scale(0.7)' , }} aria-label="checklist" onClick={(id)=>deleteAPICall(list.id)}>
                                                <DeleteIcon  />
                                                </Fab>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <Fab color="primary" size="small" style={{ transform: 'scale(0.7)' , }} aria-label="checklist" onClick={(id)=>deleteAPICall(list.id)}>
                                                <EditIcon  />
                                                </Fab>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                }
                            </React.Fragment>
                        ))}
                        
                        {data2.map((list) => (
                            <React.Fragment key={list.id}>
                                {list.ownerUsername===localStorage.getItem('username')?<></>:
                                <Grid item >
                                    <Card  sx={{ width: 250}}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                            {list.title}
                                            </Typography>
                                            <Typography variant="body2">
                                            {'مالک : '+ list.ownerUsername}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Tooltip title="Open">
                                                <Fab color="success" size="small" style={{ transform: 'scale(0.7)',}} aria-label="open" onClick={()=>openList(list)}>
                                                <OpenInFullIcon  />
                                                </Fab>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Fab color="error" size="small" style={{ transform: 'scale(0.7)' , }} aria-label="checklist" onClick={(id)=>deleteAPICall(list.id)}>
                                                <DeleteIcon  />
                                                </Fab>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                }
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Modal
                open={createModal}
                onClose={handleCloseCreateModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={CreateStyle}>
                    <CreateList setSnackbarInfo={props.setSnackbarInfo} update={update} setUpdate={setUpdate} handleCloseCreateModal={handleCloseCreateModal}></CreateList>
                </Box >
            </Modal>
        </Layout>
    );
}

export {
    ListofLists,
}