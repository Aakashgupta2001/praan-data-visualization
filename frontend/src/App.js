import React, { useState, useEffect } from "react";
import Dashboard from "./pages/dashboard";
import Header from "./components/header";

function App() {
  return (
    <div className="bg-blue-400 dark:bg-gray-700 h-screen w-full">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
