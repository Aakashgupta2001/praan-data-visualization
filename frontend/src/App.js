import React, { useState, useEffect } from "react";
import Dashboard from "./pages/dashboard";
import Header from "./components/header";

function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={`${dark ? "dark bg-gray-700" : "bg-slate-300"}  w-full`}>
      <Header setDark={setDark} />
      <Dashboard />
    </div>
  );
}

export default App;
