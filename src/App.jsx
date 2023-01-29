// IMPORT CORE PACKAGES
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORT USER DRFINED COMPONENTS
import SnackbarAlert from './components/Snackbar';
import {Login} from './components/Account/Login.jsx';
import {Signup} from './components/Account/Signup';
import { ListofLists } from './components/TodoList/ListofLists';
import { ListPage } from './components/TodoList/List';

import { 
  ThemeProvider, 
  createTheme 
} from '@mui/material/styles';

// import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}


const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ["IRANSansX",'Vazir', 'Arial', 'sans-serif', 'Roboto'].join(','),
    fontSize: 15,
  },
});


const App = () => {

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  return (
    <ThemeProvider theme={theme}>
      <RTL>
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<Login setSnackbarInfo={setSnackbarInfo}/>} />
            <Route path="/Signup" element={<Signup setSnackbarInfo={setSnackbarInfo}/>} />
            <Route path="/List" element={<ListofLists setSnackbarInfo={setSnackbarInfo}/>} />
            <Route path="/List/items" element={<ListPage setSnackbarInfo={setSnackbarInfo}/>} />
          </Routes>
          
        </BrowserRouter>
        <SnackbarAlert
          open={snackbarInfo.open}
          setOpen={e => setSnackbarInfo({ message: '', severity: 'info', open: e })}
          message={snackbarInfo.message}
          severity={snackbarInfo.severity}
        />
      </RTL>
    </ThemeProvider>
  );
}

export default App;