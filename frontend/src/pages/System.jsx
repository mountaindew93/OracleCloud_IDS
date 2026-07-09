// src/pages/System.jsx
import React from 'react';
import ModelCard from '../components/system/ModelCard';
import LiveStatus from '../components/system/LiveStatus';
import ServerStatus from '../components/system/ServerStatus';

export default function System() {
  return (
    <section className="page active">
      <div className="page-head" style={{ marginBottom: 12 }}>
        <div className="card-sub" style={{ fontSize: 11, letterSpacing: .4, textTransform: "uppercase" }}>AI 모델 정보 · 실시간 상태</div>
      </div>
      
      <div className="grid-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <ModelCard />
        <LiveStatus />
      </div>

      <ServerStatus />
    </section>
  );
}