// src/components/dashboard/RiskGauge.jsx

import React from "react";

export default function RiskGauge({ attackRate = 0 }) {

  const score = Number(attackRate);

  let level = "LOW";
  let desc = "안전 상태입니다.";

  if (score >= 75) {
    level = "CRITICAL";
    desc = "심각(Critical) 단계 - 즉시 대응이 필요합니다.";
  } else if (score >= 50) {
    level = "HIGH";
    desc = "높음(High) 단계 - 공격 트래픽이 증가하고 있습니다.";
  } else if (score >= 25) {
    level = "MEDIUM";
    desc = "주의(Medium) 단계 - 지속적인 모니터링이 필요합니다.";
  }

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">시스템 위협 게이지</div>
          <div className="card-sub">
            모델 신뢰도 기반 실시간 위협 수준
          </div>
        </div>
      </div>

      <div className="gauge-card">

        <div className="gauge-score-row">
          <div className="gauge-score">{score}</div>
          <div className="gauge-max">/ 100</div>
          <div className="gauge-badge">{level}</div>
        </div>

        <div className="gauge-desc">
          {desc}
        </div>

        <div className="gauge-track">
          <div
            className="gauge-pointer"
            style={{ left: `${score}%` }}
          />
        </div>

        <div className="gauge-labels">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>

        <div className="gauge-stats">
          <div>
            <div className="gauge-stat-label">공격률</div>
            <div className="gauge-stat-value">{score}%</div>
          </div>

          <div>
            <div className="gauge-stat-label">상태</div>
            <div className="gauge-stat-value">{level}</div>
          </div>

          <div>
            <div className="gauge-stat-label">업데이트</div>
            <div
              className="gauge-stat-value"
              style={{ fontSize: 12.5 }}
            >
              실시간
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}