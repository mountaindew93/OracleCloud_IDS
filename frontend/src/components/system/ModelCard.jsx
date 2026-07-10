// src/components/system/ModelCard.jsx

import React from "react";

export default function ModelCard({ model }) {
  return (
    <div className="model-card">
      <div className="model-head">
        <div className="ico">🌲</div>
        <b>Model Information</b>
      </div>

      <div className="model-grid">

        <div className="model-field">
          <div className="k">모델명</div>
          <div className="v">{model.model_name}</div>
        </div>

        <div className="model-field">
          <div className="k">알고리즘</div>
          <div className="v">{model.algorithm}</div>
        </div>

        <div className="model-field">
          <div className="k">Accuracy</div>
          <div className="v">
            {(model.accuracy * 100).toFixed(2)}%
          </div>
        </div>

        <div className="model-field">
          <div className="k">Dataset</div>
          <div className="v">{model.dataset}</div>
        </div>

        <div className="model-field">
          <div className="k">학습일</div>
          <div className="v">-</div>
        </div>

        <div className="model-field">
          <div className="k">모델 버전</div>
          <div className="v">{model.model_name}</div>
        </div>

      </div>
    </div>
  );
}