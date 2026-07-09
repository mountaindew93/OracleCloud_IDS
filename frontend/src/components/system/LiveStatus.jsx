// src/components/system/LiveStatus.jsx
import React from 'react';

export default function LiveStatus() {
  return (
    <div className="live-card">
      <div className="live-top"><span className="dot" />실시간 모니터링 중</div>
      <div className="live-desc">Scheduler가 주기적으로 트래픽을 수집·분석하며, 새로운 탐지 결과가 발생하는 즉시 대시보드에 반영됩니다.</div>
      <div className="live-stats">
        <div><div className="k">마지막 갱신</div><div className="v">방금 전</div></div>
        <div><div className="k">갱신 주기</div><div className="v">5초</div></div>
        <div><div className="k">이번 세션 갱신 횟수</div><div className="v">52</div></div>
      </div>
    </div>
  );
}