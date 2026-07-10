// src/components/system/ServerStatus.jsx
import React from 'react';

export default function ServerStatus() {
  return (
    <div className="card server-card">
      <div className="card-head">
        <div>
          <div className="card-title">서버 상태</div>
          <div className="card-sub">간단한 상태 표시</div>
        </div>
      </div>
      <div className="status-row">
        <div className="status-dot" style={{ background: "var(--green)", boxShadow: "0 0 0 4px var(--green-bg)" }} />
        <div className="status-name">API</div>
        <span className="status-badge ok">Operational</span>
      </div>
      <div className="status-row">
        <div className="status-dot" style={{ background: "var(--green)", boxShadow: "0 0 0 4px var(--green-bg)" }} />
        <div className="status-name">Database</div>
        <span className="status-badge ok">Operational</span>
      </div>
      <div className="status-row">
        <div className="status-dot" style={{ background: "var(--green)", boxShadow: "0 0 0 4px var(--green-bg)" }} />
        <div className="status-name">Pipeline</div>
        <span className="status-badge ok">Operational</span>
      </div>
    </div>
  );
}