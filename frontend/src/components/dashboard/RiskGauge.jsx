// src/components/dashboard/RiskGauge.jsx
import React from 'react';

export default function RiskGauge() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">시스템 위협 게이지</div>
          <div className="card-sub">모델 신뢰도 기반 실시간 위협 수준</div>
        </div>
      </div>
      <div className="gauge-card">
        <div className="gauge-score-row">
          <div className="gauge-score">72</div>
          <div className="gauge-max">/ 100</div>
          <div className="gauge-badge">Caution</div>
        </div>
        <div className="gauge-desc">경계(Caution) 단계 — DoS 트래픽 상승 중</div>
        <div className="gauge-track"><div className="gauge-pointer" style={{ left: "72%" }} /></div>
        <div className="gauge-labels"><span>Low</span><span>Caution</span><span>High</span></div>
        <div className="gauge-stats">
          <div><div className="gauge-stat-label">24H 최고</div><div className="gauge-stat-value">86</div></div>
          <div><div className="gauge-stat-label">24H 평균</div><div className="gauge-stat-value">64</div></div>
          <div><div className="gauge-stat-label">업데이트</div><div className="gauge-stat-value" style={{ fontSize: 12.5 }}>방금 전</div></div>
        </div>
      </div>
    </div>
  );
}