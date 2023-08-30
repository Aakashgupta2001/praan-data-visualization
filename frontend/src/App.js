import React, { useState, useEffect } from "react";
import Dashboard from "./pages/dashboard";
import Header from "./components/header";
import LoginPage from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Route, Routes } from "react-router-dom";

import { useAppSelector } from "./store/hooks";

function App() {
  // state to keep track of dark mode
  const [dark, setDark] = useState(true);
  // check if user is logged in or not
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className={`${dark ? "dark bg-gray-700" : "bg-slate-300"}  w-full`}>
      <Header setDark={setDark} isAuthenticated={isAuthenticated} />
      <Routes>
        {/* protected route */}
        {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
        {isAuthenticated && <Route path="/*" element={<Dashboard />} />}
        {/* unprotected route */}
        {!isAuthenticated && (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
