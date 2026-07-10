// src/pages/AttackLogs.jsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import LogFilter from "../components/logs/LogFilter";
import LogTable from "../components/logs/LogTable";
import api from "../services/api";

export default function AttackLogs() {
  const [LOGS, setLOGS] = useState([]);
  const [viewMode, setViewMode] = useState("attack");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [logDate, setLogDate] = useState("");
  const [minConf, setMinConf] = useState(0);
  const [sortByConf, setSortByConf] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 7;

  const loadLogs = useCallback(async (mode) => {
    try {
      const res = await api.get(`/logs?mode=${mode}`);
      setLOGS(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Load Logs Error:", err);
      setLOGS([]);
    }
  }, []);

  useEffect(() => {
    loadLogs(viewMode);

    const timer = setInterval(() => {
      loadLogs(viewMode);
    }, 60000);

    return () => clearInterval(timer);
  }, [viewMode, loadLogs]);

  const resetPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const filteredLogs = useMemo(() => {
    let rows = LOGS.filter((r) => {
      if (viewMode === "attack" && r.prediction !== "Attack") return false;

      if (typeFilter !== "전체" && r.predicted_attack !== typeFilter)
        return false;

      if (logDate && r.created_at.substring(0, 10) !== logDate)
        return false;

      if (r.confidence * 100 < minConf)
        return false;

      return true;
    });

    rows.sort((a, b) =>
      sortByConf
        ? b.confidence - a.confidence
        : new Date(b.created_at) - new Date(a.created_at)
    );

    return rows;
  }, [LOGS, viewMode, typeFilter, logDate, minConf, sortByConf]);

  const total = filteredLogs.length;
  const start = currentPage * PAGE_SIZE;
  const pageRows = filteredLogs.slice(start, start + PAGE_SIZE);

  return (
    <section
      className="page active"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      <LogFilter
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        logDate={logDate}
        setLogDate={setLogDate}
        minConf={minConf}
        setMinConf={setMinConf}
        viewMode={viewMode}
        setViewMode={setViewMode}
        resetPage={resetPage}
      />

      <LogTable
        pageRows={pageRows}
        total={total}
        start={start}
        PAGE_SIZE={PAGE_SIZE}
        setSortByConf={setSortByConf}
        resetPage={resetPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}