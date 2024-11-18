import React from 'react';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
