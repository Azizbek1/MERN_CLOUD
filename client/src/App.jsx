import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegistPage from './pages/RegistPage';
import LayoutCustom from './layouts/index';
export default function App() {
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
