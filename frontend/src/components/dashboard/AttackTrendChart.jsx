// src/components/dashboard/AttackTrendChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { setupChartDefaults } from '../../utils/chartConfig';

export default function AttackTrendChart({ hours, lineData }) {
  const lineCanvasRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    setupChartDefaults();

    if (lineCanvasRef.current) {
      lineChartRef.current = new Chart(lineCanvasRef.current, {
        type: "line",
        data: {
          labels: hours,
          datasets: [{
            data: lineData, borderColor: "#0BC5B1", backgroundColor: "rgba(11,197,177,.12)",
            fill: true, tension: 0.4, pointRadius: 2.5, pointBackgroundColor: "#0BC5B1", borderWidth: 2.5
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false } }, y: { grid: { color: "#F0F3FA" } } },
          maintainAspectRatio: false
        }
      });
    }
    return () => {
      lineChartRef.current?.destroy();
    };
  }, [hours, lineData]);

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">실시간 공격 추이</div>
          <div className="card-sub">공격 발생 건수 · 24시간</div>
        </div>
        <div className="dropdown-pill">오늘 ▾</div>
      </div>
      <div className="chart-box" style={{ height: 210 }}>
        <canvas ref={lineCanvasRef} />
      </div>
    </div>
  );
}