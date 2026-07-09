// src/components/dashboard/AttackTypeChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { setupChartDefaults } from '../../utils/chartConfig';
import { ATTACK_TYPES, BAR_COLOR } from '../../utils/constants';

export default function AttackTypeChart({ typeCounts }) {
  const barCanvasRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    setupChartDefaults();

    if (barCanvasRef.current) {
      barChartRef.current = new Chart(barCanvasRef.current, {
        type: "bar",
        data: {
          labels: ATTACK_TYPES,
          datasets: [{ 
            data: typeCounts, 
            backgroundColor: ATTACK_TYPES.map(t => BAR_COLOR[t]), 
            borderRadius: 7, 
            maxBarThickness: 22 
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false }, ticks: { font: { size: 9 } } }, y: { grid: { color: "#F0F3FA" } } },
          maintainAspectRatio: false
        }
      });
    }
    return () => {
      barChartRef.current?.destroy();
    };
  }, [typeCounts]);

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">공격 유형별 통계</div>
          <div className="card-sub">Bar Chart</div>
        </div>
      </div>
      <div className="chart-box" style={{ height: 270 }}>
        <canvas ref={barCanvasRef} />
      </div>
    </div>
  );
}