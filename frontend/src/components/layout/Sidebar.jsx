// src/components/layout/Sidebar.jsx
import React from 'react';

const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/>
    <rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>
  </svg>
);

const IconLogs = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 5h16M4 12h16M4 19h10"/>
  </svg>
);

const IconSystem = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>
  </svg>
);

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="sb-card">
        <div className="brand">
          <div className="brand-icon">◈</div>
          <div>
            <div className="brand-text">NETGUARD IDS</div>
            <div className="brand-sub">NETWORK SECURITY</div>
          </div>
        </div>
        <nav>
          <div className={`nav-item ${page === "dashboard" ? "active" : ""}`} onClick={() => setPage("dashboard")}>
            <IconDashboard /> Dashboard
          </div>
          <div className={`nav-item ${page === "logs" ? "active" : ""}`} onClick={() => setPage("logs")}>
            <IconLogs /> Attack Logs
          </div>
          <div className={`nav-item ${page === "system" ? "active" : ""}`} onClick={() => setPage("system")}>
            <IconSystem /> System
          </div>
        </nav>
        <div className="promo-card">
          <div className="promo-title"><span className="promo-dot" />실시간 수집 중</div>
        </div>
      </div>
    </aside>
  );
}