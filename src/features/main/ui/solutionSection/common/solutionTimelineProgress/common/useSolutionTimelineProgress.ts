import { useEffect, useRef, useState } from "react";

import { resolveProgressUnits } from "../../solutionTimeline/common/solutionTimeline";

// Converts the trigger element's distance from viewport center into timeline progress units.
export const useSolutionTimelineProgress = (isActivated: boolean) => {
  const progressTriggerRef = useRef<HTMLParagraphElement | null>(null);
  const [progressUnits, setProgressUnits] = useState(0);

  useEffect(() => {
    if (!isActivated) {
      return;
    }

    let frameId: number | null = null;

    const calculate = () => {
      const triggerNode = progressTriggerRef.current;
      if (!triggerNode) {
        setProgressUnits(0);
        return;
      }

      const rect = triggerNode.getBoundingClientRect();
      const triggerCenterY = rect.top + rect.height * 0.5;
      const viewportCenterY = window.innerHeight * 0.5;
      const nextProgressUnits = resolveProgressUnits({
        isActivated,
        distancePx: viewportCenterY - triggerCenterY,
      });
      setProgressUnits(nextProgressUnits);
    };

    const schedule = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        calculate();
      });
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isActivated]);

  return {
    progressTriggerRef,
    progressUnits: isActivated ? progressUnits : 0,
  };
};
