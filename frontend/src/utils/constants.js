// src/utils/constants.js

export const ATTACK_TYPES = ["DoS", "Exploits", "Generic", "Reconnaissance", "Fuzzers", "Analysis", "Backdoor", "Shellcode", "Worms"];

export const TYPE_COLOR = {
  DoS: "#EE5D50", Exploits: "#FFB547", Generic: "#7551FF", Reconnaissance: "#00B5D8",
  Fuzzers: "#05CD99", Analysis: "#3E5EFF", Backdoor: "#E24BB3", Shellcode: "#FF8A65", Worms: "#8894C4",
  Normal: "#05CD99"
};

export const TYPE_ICON = {
  DoS: "💥", Exploits: "🛠️", Generic: "🔐", Reconnaissance: "🔍", Fuzzers: "🎲",
  Analysis: "📎", Backdoor: "🚪", Shellcode: "⌨️", Worms: "🪱", Normal: "✅"
};

export const BAR_COLOR = {
  DoS: "#E9A69D", Exploits: "#F6D3A0", Generic: "#B7ABDE", Reconnaissance: "#9BC7D3",
  Fuzzers: "#9ED9BE", Analysis: "#A6B3DE", Backdoor: "#DDAAC9", Shellcode: "#F0C0A6", Worms: "#BFC4DC"
};

export const PAGE_TITLES = { 
  dashboard: "실시간 네트워크 모니터링", 
  logs: "Attack Logs", 
  system: "System" 
};