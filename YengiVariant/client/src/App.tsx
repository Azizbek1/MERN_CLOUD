import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { PrivateRouter } from "./Routes";

import LayoutPage from "./Layouts";
import DiskPage from "./Pages/DiskPage";
import NotifacationPage from "./Pages/NotifacationPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import GlobalStyle from "./Style/GlobalStyle";
const App = () => {
  const auth = true;
  return (
    <GlobalStyle>
      {auth ? (
        <Routes>
          <Route element={<LayoutPage />}>
            <Route index element={<DiskPage />} />
            {PrivateRouter.map((route) => (
              <Route
                element={route.component}
                path={route.path}
                key={route.key}
              />
            ))}
            <Route path="*" element={<NotifacationPage />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotifacationPage />} />
        </Routes>
      )}
    </GlobalStyle>
  );
};

export default App;
