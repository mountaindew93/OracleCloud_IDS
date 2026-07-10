// src/pages/Dashboard.jsx

import React, { useEffect, useMemo, useState } from "react";

import SummaryCard from "../components/dashboard/SummaryCard";
import RiskGauge from "../components/dashboard/RiskGauge";
import AttackTrendChart from "../components/dashboard/AttackTrendChart";
import AttackTypeChart from "../components/dashboard/AttackTypeChart";
import RecentAttack from "../components/dashboard/RecentAttack";

import api from "../services/api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadDashboard();

    const timer = setInterval(loadDashboard, 60000);

    return () => clearInterval(timer);
  }, []);

  async function loadDashboard() {
    try {

      const [dashboardRes, attackRes] = await Promise.all([
        api.get("/dashboard"),
        api.get("/recent-attacks")
      ]);

      setDashboard(dashboardRes.data);
      setAlerts(attackRes.data);

    } catch (err) {
      console.error("Dashboard API Error :", err);
    }
  }

  // 아직 API가 오기 전
  if (!dashboard) {
    return <div>Loading...</div>;
  }

  const summary = dashboard.summary;

  const attackRate =
    summary.total_predictions === 0
      ? 0
      : (summary.total_attacks / summary.total_predictions) * 100;

  
  const attackMap = {};

  dashboard.statistics.forEach(item => {
  attackMap[item.predicted_attack] = item.count;
  });

  const typeCounts = [
    attackMap["DoS"] || 0,
    attackMap["Exploits"] || 0,
    attackMap["Generic"] || 0,
    attackMap["Reconnaissance"] || 0,
    attackMap["Fuzzers"] || 0,
    attackMap["Analysis"] || 0,
    attackMap["Backdoor"] || 0,
    attackMap["Shellcode"] || 0,
    attackMap["Worms"] || 0,
  ];

  const hours = dashboard.trend.map(item => item.hour);
  const lineData = dashboard.trend.map(item => item.count);

  return (
    <section className="page active dashboard-page">

      <SummaryCard
        total={summary.total_predictions}
        normal={summary.total_normal}
        attack={summary.total_attacks}
        attackRate={attackRate}
        accuracy={(dashboard.model.accuracy * 100).toFixed(2)}
      />

      <div className="grid-2">
        <RiskGauge attackRate={summary.risk_score} />
        <AttackTrendChart
          hours={hours}
          lineData={lineData}
        />
      </div>

      <div className="grid-alerts">
        <AttackTypeChart
          typeCounts={typeCounts}
        />

        <RecentAttack
          alerts={alerts}
        />
      </div>

    </section>
  );
}