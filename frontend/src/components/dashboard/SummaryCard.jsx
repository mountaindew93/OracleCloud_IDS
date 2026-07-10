// src/components/dashboard/SummaryCard.jsx

import React from "react";

export default function SummaryCard({
  total = 0,
  normal = 0,
  attack = 0,
  attackRate = 0,
  accuracy = 0
}) {

  const normalRate =
    total > 0 ? ((normal / total) * 100).toFixed(1) : "0.0";

  return (
    <div className="kpi-row">

      <div className="kpi-card">
        <div>
          <div className="kpi-label">총 분석 트래픽</div>
          <div className="kpi-value">{total.toLocaleString()}</div>
        </div>

        <div className="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0BC5B1" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 20V10M11 20V4M18 20v-7"/>
          </svg>
        </div>
      </div>

      <div className="kpi-card">
        <div>
          <div className="kpi-label">공격 탐지</div>

          <div className="kpi-value">
            {attack.toLocaleString()}
            <span
              className="kpi-delta"
              style={{ color: "var(--red)" }}
            >
              {attackRate.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0BC5B1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4M12 17h.01"/>
            <path d="M10.3 3.9 2.7 17.1a1.8 1.8 0 0 0 1.6 2.7h15.4a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z"/>
          </svg>
        </div>
      </div>

      <div className="kpi-card">
        <div>
          <div className="kpi-label">정상 트래픽</div>

          <div className="kpi-value">
            {normal.toLocaleString()}
            <span
              className="kpi-delta"
              style={{ color: "var(--green)" }}
            >
              {normalRate}%
            </span>
          </div>
        </div>

        <div className="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0BC5B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12l5 5 11-11"/>
            
          </svg>
        </div>
      </div>

      <div className="kpi-card">
        <div>
          <div className="kpi-label">공격 비율</div>

          <div className="kpi-value">
            {attackRate.toFixed(2)}%
          </div>
        </div>

        <div className="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0BC5B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="8.5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="12" cy="12" r=".6" fill="#0BC5B1"/>
          </svg>
        </div>
      </div>

    </div>
  );
}