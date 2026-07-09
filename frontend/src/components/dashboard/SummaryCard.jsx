// src/components/dashboard/SummaryCard.jsx
import React from 'react';

export default function SummaryCard() {
  return (
    <div className="kpi-row">
      <div className="kpi-card">
        <div>
          <div className="kpi-label">총 분석 트래픽</div>
          <div className="kpi-value">24,850</div>
        </div>
        <div className="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0BC5B1" strokeWidth="2.2" strokeLinecap="round"><path d="M4 20V10M11 20V4M18 20v-7"/></svg>
        </div>
      </div>
      <div className="kpi-card">
        <div>
          <div className="kpi-label">정상 트래픽 수</div>
          <div className="kpi-value">21,633 <span className="kpi-delta" style={{ color: "var(--green)" }}>87.1%</span></div>
        </div>
        <div className="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0BC5B1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5 11-11"/></svg>
        </div>
      </div>
      <div className="kpi-card">
        <div>
          <div className="kpi-label">공격 트래픽 수</div>
          <div className="kpi-value">3,217 <span className="kpi-delta" style={{ color: "var(--red)" }}>12.9%</span></div>
        </div>
        <div className="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0BC5B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 2.7 17.1a1.8 1.8 0 0 0 1.6 2.7h15.4a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z"/></svg>
        </div>
      </div>
      <div className="kpi-card">
        <div>
          <div className="kpi-label">모델 정확도</div>
          <div className="kpi-value">94.2% <span className="kpi-delta" style={{ color: "var(--green)" }}>+0.4</span></div>
        </div>
        <div className="kpi-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0BC5B1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6" fill="#0BC5B1"/></svg>
        </div>
      </div>
    </div>
  );
}