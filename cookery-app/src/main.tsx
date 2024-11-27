import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { App } from './App.tsx';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home/Home.tsx';
import { LoginPage } from './components/Login/LoginPage.tsx';
import { RegisterPage } from './components/Register/RegisterPage.tsx';
import { Header } from './components/Header/Header.tsx';
import { UserPage } from './components/User/UserPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form'>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
        <Route path='/users'>
          <Route path='userpage/:id' element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
