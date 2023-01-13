import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegistPage from "./pages/RegistPage";
import LayoutCustom from "./layouts/index";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/user";
export default function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  console.log(isAuth);
  useEffect(() => {
    dispatch(auth());
  }, []);
  return !isAuth ? (
    <Routes>
      <Route element={<LayoutCustom />}>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistPage />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route element={<LayoutCustom />}>
        <Route index element={<MainPage />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}
