// src/App.jsx
import React, { useState } from "react";

// CSS Imports
import "./styles/global.css";
import "./styles/sidebar.css";
import "./styles/header.css";
import "./styles/dashboard.css";
import "./styles/attacklogs.css";
import "./styles/system.css";

// Layout Imports
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";

// Page Imports
import Dashboard from "./pages/Dashboard";
import AttackLogs from "./pages/AttackLogs";
import System from "./pages/System";

export default function App() {
  // 향후 2차 단계에서 React Router로 변경될 상태값입니다.
  const [page, setPage] = useState("dashboard");

  return (
    <div className="ng-root">
      <Sidebar page={page} setPage={setPage} />
      
      <main>
        <Header page={page} />
        
        <div className="content">
          {page === "dashboard" && <Dashboard />}
          {page === "logs" && <AttackLogs />}
          {page === "system" && <System />}
        </div>
      </main>
    </div>
  );
}