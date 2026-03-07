import { type RefObject, useEffect, useState } from "react";

import {
  ASSIGNMENT_HELP_STORY_SECTION_ORDER,
  type AssignmentHelpStorySectionId,
  type AssignmentHelpStorySectionProgressMap,
} from "../components/features/assignmentHelp/assignmentHelpStoryTimeline";

const clamp01 = (value: number) => {
  return Math.min(1, Math.max(0, value));
};

const createZeroProgressMap = (): AssignmentHelpStorySectionProgressMap => {
  return {
    intro: 0,
    chat: 0,
    timeLoss: 0,
  };
};

const calculateSectionProgress = (section: HTMLElement | null) => {
  if (!section) {
    return 0;
  }

  const rect = section.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;

  if (travel <= 1) {
    return rect.top <= 0 ? 1 : 0;
  }

  return clamp01(-rect.top / travel);
};

const isProgressMapEqual = (
  left: AssignmentHelpStorySectionProgressMap,
  right: AssignmentHelpStorySectionProgressMap,
) => {
  return ASSIGNMENT_HELP_STORY_SECTION_ORDER.every((sectionId) => {
    return Math.abs(left[sectionId] - right[sectionId]) < 0.0001;
  });
};

export type AssignmentHelpSectionRefs = Record<
  AssignmentHelpStorySectionId,
  RefObject<HTMLElement | null>
>;

export const useAssignmentHelpSectionProgresses = (
  sectionRefs: AssignmentHelpSectionRefs,
) => {
  const [progresses, setProgresses] =
    useState<AssignmentHelpStorySectionProgressMap>(createZeroProgressMap);

  useEffect(() => {
    let frameId: number | null = null;

    const calculate = () => {
      const nextProgress =
        ASSIGNMENT_HELP_STORY_SECTION_ORDER.reduce<AssignmentHelpStorySectionProgressMap>(
          (acc, sectionId) => {
            acc[sectionId] = calculateSectionProgress(
              sectionRefs[sectionId].current,
            );
            return acc;
          },
          createZeroProgressMap(),
        );

      setProgresses((current) => {
        if (isProgressMapEqual(current, nextProgress)) {
          return current;
        }

        return nextProgress;
      });
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
  }, [sectionRefs]);

  return progresses;
};
