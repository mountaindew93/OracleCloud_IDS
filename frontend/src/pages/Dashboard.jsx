// src/pages/Dashboard.jsx
import React, { useMemo, useState } from 'react';
import SummaryCard from '../components/dashboard/SummaryCard';
import RiskGauge from '../components/dashboard/RiskGauge';
import AttackTrendChart from '../components/dashboard/AttackTrendChart';
import AttackTypeChart from '../components/dashboard/AttackTypeChart';
import RecentAttack from '../components/dashboard/RecentAttack';
import { pad, rnd, makeLog } from '../data/mockData';

export default function Dashboard() {
  // Mock 데이터 생성 (향후 3차 단계에서 API로 대체될 부분)
  const typeCounts = useMemo(() => [1180, 720, 610, 290, 340, 180, 150, 90, 60], []);
  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => pad(i * 2) + ":00"), []);
  const lineData = useMemo(() => hours.map(() => rnd(20, 260)), [hours]);
  const [alerts] = useState(() =>
    Array.from({ length: 6 }, () => makeLog(true)).sort((a, b) => b.time.localeCompare(a.time))
  );

  return (
    <section className="page active dashboard-page">
      <SummaryCard />

      <div className="grid-2">
        <RiskGauge />
        <AttackTrendChart hours={hours} lineData={lineData} />
      </div>

      <div className="grid-alerts">
        <AttackTypeChart typeCounts={typeCounts} />
        <RecentAttack alerts={alerts} />
      </div>
    </section>
  );
}