import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import {ResponsiveAppBar} from "../AppBar.jsx"

function Layout(props){
    return(
        <>
        <ResponsiveAppBar/>
        <Grid container spacing={2} sx={{width:1200, height:550 , m:'auto', mt:5, border:3, borderRadius:5, borderColor:'primary.main'}}>
            <Grid sx={{width: 390 , height:'100%'}}>
                {props.children}
            </Grid>
            <Box
                component="img"
                sx={{
                    height:500,
                    width:650,
                    mr:10
                }}
                alt="The house from the offer."
                src={require('./../../assets/images/todo.png')}
            />
        </Grid>
        </>
    );
}

export{
    Layout,
};