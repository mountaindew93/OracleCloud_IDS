// src/pages/AttackLogs.jsx
import React, { useState, useMemo, useCallback } from 'react';
import LogFilter from '../components/logs/LogFilter';
import LogTable from '../components/logs/LogTable';
import { makeLog } from '../data/mockData';

export default function AttackLogs() {
  const LOGS = useMemo(() => Array.from({ length: 80 }, () => makeLog(false)), []);
  
  const [viewMode, setViewMode] = useState("attack");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [logDate, setLogDate] = useState("2026-07-09");
  const [minConf, setMinConf] = useState(0);
  const [sortByConf, setSortByConf] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 7;

  const resetPage = useCallback(() => setCurrentPage(0), []);

  const filteredLogs = useMemo(() => {
    let rows = LOGS.filter(r => {
      if(viewMode === "attack" && !r.isAttack) return false;
      if(typeFilter !== "전체" && r.type !== typeFilter) return false;
      if(r.conf < minConf) return false;
      return true;
    });
    rows = rows.slice().sort((a, b) => sortByConf ? b.conf - a.conf : b.time.localeCompare(a.time));
    return rows;
  }, [LOGS, viewMode, typeFilter, minConf, sortByConf]);

  const total = filteredLogs.length;
  const start = currentPage * PAGE_SIZE;
  const pageRows = filteredLogs.slice(start, start + PAGE_SIZE);

  return (
    <section className="page active" style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <LogFilter 
        typeFilter={typeFilter} setTypeFilter={setTypeFilter}
        logDate={logDate} setLogDate={setLogDate}
        minConf={minConf} setMinConf={setMinConf}
        viewMode={viewMode} setViewMode={setViewMode}
        resetPage={resetPage}
      />
      <LogTable 
        pageRows={pageRows} total={total} start={start} 
        PAGE_SIZE={PAGE_SIZE} setSortByConf={setSortByConf} 
        resetPage={resetPage} setCurrentPage={setCurrentPage}
      />
    </section>
  );
}