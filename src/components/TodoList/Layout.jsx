import Grid from "@mui/material/Grid";

import {ResponsiveAppBar} from "../AppBar.jsx"

function Layout(props){
    return(
        <>
        <ResponsiveAppBar/>
        <Grid  sx={{width:1200, height:600 , m:'auto', mt:2, border:3, borderColor:'primary.main', overflow:'auto', bgcolor:'#f2f7fc'}}>
            {props.children}
        </Grid>
        </>
    );
}

export{
    Layout,
};