// src/pages/System.jsx

import React, { useEffect, useState } from "react";

import ModelCard from "../components/system/ModelCard";
import LiveStatus from "../components/system/LiveStatus";
import ServerStatus from "../components/system/ServerStatus";

import api from "../services/api";

export default function System() {
  const [dashboard, setDashboard] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    loadSystem();

    const timer = setInterval(loadSystem, 60000);

    return () => clearInterval(timer);
  }, []);

  async function loadSystem() {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data);

      setUpdateCount(prev => prev + 1);

    } catch (err) {
      console.error("System API Error :", err);
    }
  }

  if (!dashboard) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page active">

      <div
        className="page-head"
        style={{ marginBottom: 12 }}
      >
        <div
          className="card-sub"
          style={{
            fontSize: 11,
            letterSpacing: .4,
            textTransform: "uppercase",
            marginLeft: 10
          }}
        >
          AI 모델 정보 · 실시간 상태
        </div>
      </div>

      <div
        className="grid-2"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <ModelCard model={dashboard.model} />

        <LiveStatus
          refresh={5}
          updateCount={updateCount}
        />
      </div>

      <ServerStatus />

    </section>
  );
}