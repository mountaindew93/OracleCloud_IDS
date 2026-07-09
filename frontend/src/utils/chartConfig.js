// src/utils/chartConfig.js
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const setupChartDefaults = () => {
  Chart.defaults.font.family = "'Plus Jakarta Sans','Noto Sans KR',sans-serif";
  Chart.defaults.font.size = 10;
  Chart.defaults.color = "#A3AED0";
};
