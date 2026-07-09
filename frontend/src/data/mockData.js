// src/data/mockData.js
import { ATTACK_TYPES } from '../utils/constants';

export function rnd(min, max) { 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

export function pad(n) { 
  return n.toString().padStart(2, "0"); 
}

export function randType(attackOnly = false) {
  if (!attackOnly && Math.random() < 0.4) return "Normal";
  return ATTACK_TYPES[rnd(0, ATTACK_TYPES.length - 1)];
}

export function makeLog(attackOnly = false) {
  const type = randType(attackOnly);
  return {
    time: `2026-07-09 ${pad(rnd(0, 23))}:${pad(rnd(0, 59))}:${pad(rnd(0, 59))}`,
    type,
    isAttack: type !== "Normal",
    conf: rnd(55, 99),
    status: type !== "Normal" ? (Math.random() < 0.75 ? "차단됨" : "검토중") : "허용"
  };
}