//요소가 아래에서 위로 올라오면서 나타나는 fade-up 애니메이션, 데스크톱에서만 적용되는 스타일
export const fadeUpStyleDesktopOnly = (progress: number, distance: number) => {
  return {
    opacity: { base: 1, xl: progress },
    transform: {
      base: "none",
      xl: `translateY(${((1 - progress) * distance).toFixed(2)}px)`,
    },
  };
};

//과제 참고 자료 패널의 스타일 스크롤을 하면서 ai 분석 패널이 올라오면서 과제 참고 자료 패널이 왼쪽으로 밀리는 애니메이션 스타일
export const referencePanelStageStyle = (
  enterProgress: number,
  shiftProgress: number,
) => {
  const x = -280 * shiftProgress;
  const y = (1 - enterProgress) * 28;
  const scale = 0.94 + 0.06 * enterProgress;

  return {
    opacity: enterProgress,
    transform: `translate(-50%, -50%) translateX(${x.toFixed(2)}px) translateY(${y.toFixed(2)}px) scale(${scale.toFixed(4)})`,
  };
};

export const analysisPanelStageStyle = (progress: number) => {
  const x = -48 + 360 * progress;
  const y = (1 - progress) * 20;

  return {
    opacity: progress,
    transform: `translate(-50%, -50%) translateX(${x.toFixed(2)}px) translateY(${y.toFixed(2)}px)`,
  };
};

//Stage 컨테이너(analysis, roadmap)의 공통 스타일
export const stageContainerStyle = (
  reveal: number,
  height: number,
  distancePx: number,
) => ({
  maxH: { base: "none", xl: `${(height * reveal).toFixed(2)}px` },
  opacity: reveal,
  overflow: { base: "visible", xl: "hidden" },
  transform: {
    base: "none",
    xl: `translateY(${((1 - reveal) * distancePx).toFixed(2)}px)`,
  },
  transition: {
    base: "none",
    xl: [
      "max-height 240ms cubic-bezier(0.22, 1, 0.36, 1)",
      "opacity 220ms ease",
      "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
    ].join(", "),
  },
});
