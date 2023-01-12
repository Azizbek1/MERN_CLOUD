import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegistPage from './pages/RegistPage';
import LayoutCustom from './layouts/index';
import { useSelector } from 'react-redux';
export default function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  console.log(isAuth);
  return (
    <Routes>
      <Route element={<LayoutCustom />}>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistPage />} />

      </Route>
    </Routes>
    
  )
}
