// src/components/dashboard/RecentAttack.jsx
import React from 'react';
import { TYPE_COLOR } from '../../utils/constants';

function AlertStatus({ status }) {
  const blocked = status === "차단됨";
  return (
    <span className={`alert-status ${blocked ? "blocked" : "detected"}`}>
      {blocked ? "Blocked" : "Detected"}
    </span>
  );
}

export default function RecentAttack({ alerts }) {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">실시간 공격 알림</div>
          <div className="card-sub">Attack으로 판단된 트래픽만 표시</div>
        </div>
      </div>
      <div className="alert-row head">
        <span>시간</span><span>공격 유형</span><span>Confidence</span><span>상태</span>
      </div>
      <div className="alert-list">
        {alerts.map((r, i) => (
          <div className="alert-row" key={i}>
            <div className="alert-time">{r.time.split(" ")[1]}</div>
            <div className="alert-type-cell">
              <div className="alert-dot" style={{ background: TYPE_COLOR[r.type] }} />
              <div className="alert-title">{r.type}</div>
            </div>
            <div className="alert-conf"><span className="conf-num">{r.conf}%</span></div>
            <div className="alert-status-cell"><AlertStatus status={r.status} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}