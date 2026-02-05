import { useWindowWidth } from "./useWindowWidth";

export const useChartConfig = () => {
  const windowWidth = useWindowWidth() || window.innerWidth;
  const isMobile = windowWidth <= 400;

  return {
    isMobile,

    // Chart size
    height: isMobile ? 300 : 400,

    // Axis sizing
    yAxisWidth: isMobile ? 55 : 70,
    axisFontSize: isMobile ? 10 : 14,

    // ✅ X-axis anti-collision spacing (DESKTOP ONLY)
    xAxisHeight: isMobile ? 50 : 70,
    xAxisTickMargin: isMobile ? 18 : 25,
    xAxisLabelDy: isMobile ? 14 : 22,

    // ✅ Chart bottom margin to separate ticks & label
    chartBottomMargin: isMobile ? 20 : 45,
  };
};
