import React from 'react';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router> {/* Router bileşeni ile yönlendirmeleri sarıyoruz */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;
