// src/components/system/ModelCard.jsx
import React from 'react';

export default function ModelCard() {
  return (
    <div className="model-card">
      <div className="model-head"><div className="ico">🌲</div><b>Model Information</b></div>
      <div className="model-grid">
        <div className="model-field"><div className="k">모델명</div><div className="v">NetGuard-RF-v1</div></div>
        <div className="model-field"><div className="k">알고리즘</div><div className="v">Random Forest</div></div>
        <div className="model-field"><div className="k">Accuracy</div><div className="v">94.2%</div></div>
        <div className="model-field"><div className="k">Dataset Size</div><div className="v">175,341 rows</div></div>
        <div className="model-field"><div className="k">학습일</div><div className="v">2026-06-28</div></div>
        <div className="model-field"><div className="k">모델 버전</div><div className="v">rf_v1.3</div></div>
      </div>
    </div>
  );
}