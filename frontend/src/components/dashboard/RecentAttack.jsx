import React from "react";
import { TYPE_COLOR } from "../../utils/constants";

function AlertStatus({ confidence }) {

  if (confidence >= 0.9) {
    return <span className="alert-status blocked">Blocked</span>;
  }

  if (confidence >= 0.6) {
    return <span className="alert-status warning">Warning</span>;
  }

  return <span className="alert-status detected">Detected</span>;
}

export default function RecentAttack({ alerts = [] }) {

  // 최대 6개만 표시
  const displayAlerts = alerts.slice(0, 6);

  return (
    <div className="card">

      <div className="card-head">
        <div>
          <div className="card-title">실시간 공격 알림</div>
          <div className="card-sub">
            Attack으로 판단된 트래픽만 표시
          </div>
        </div>
      </div>

      <div className="alert-row head">
        <span>시간</span>
        <span>공격 유형</span>
        <span>Confidence</span>
        <span>상태</span>
      </div>

      <div className="alert-list">

        {displayAlerts.length > 0 ? (
          displayAlerts.map((r) => (

            <div
              className="alert-row"
              key={`${r.id}-${r.created_at}`}
            >

              <div className="alert-time">
                {new Date(r.created_at).toLocaleTimeString("ko-KR")}
              </div>

              <div className="alert-type-cell">
                <div
                  className="alert-dot"
                  style={{
                    background:
                      TYPE_COLOR[r.predicted_attack] || "#0BC5B1"
                  }}
                />

                <div className="alert-title">
                  {r.predicted_attack}
                </div>
              </div>

              <div className="alert-conf">
                <span className="conf-num">
                  {(r.confidence * 100).toFixed(1)}%
                </span>
              </div>

              <div className="alert-status-cell">
                <AlertStatus confidence={r.confidence}/>
              </div>

            </div>

          ))
        ) : (
          <div
            style={{
              padding: "28px",
              textAlign: "center",
              color: "var(--text-faint)"
            }}
          >
            최근 24시간 동안 탐지된 공격이 없습니다.
          </div>
        )}

      </div>

    </div>
  );
}