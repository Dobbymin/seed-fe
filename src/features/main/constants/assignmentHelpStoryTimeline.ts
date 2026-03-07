export type AssignmentHelpStorySectionId = "intro" | "chat" | "timeLoss";

export type AssignmentHelpStorySectionProgressMap = Record<
  AssignmentHelpStorySectionId,
  number
>;

type ScrollTerm = "short" | "long";
type AssignmentHelpStorySceneKind = "hold" | "transition" | "chatStage";

export const ASSIGNMENT_HELP_STORY_SCROLL_TERM_VH = {
  short: 50,
  long: 10,
} as const;

export const ASSIGNMENT_HELP_STORY_SECTION_ORDER: AssignmentHelpStorySectionId[] =
  ["intro", "chat", "timeLoss"];

export const ASSIGNMENT_HELP_STORY_SCENE_SEQUENCE = [
  {
    id: "introDotHold",
    kind: "hold",
    section: "intro",
    term: "long",
  },
  {
    id: "introComposerReveal",
    kind: "transition",
    section: "intro",
    term: "long",
  },
  {
    id: "introComposerIdle",
    kind: "hold",
    section: "intro",
    term: "long",
  },
  {
    id: "introPromptFill",
    kind: "transition",
    section: "intro",
    term: "long",
  },
  {
    id: "chatDock",
    kind: "transition",
    section: "chat",
    term: "long",
  },
  {
    id: "chatPromptExit",
    kind: "transition",
    section: "chat",
    term: "short",
  },
  {
    id: "chatUserOnly",
    kind: "chatStage",
    section: "chat",
    term: "short",
  },
  {
    id: "chatHelpAndMethod",
    kind: "chatStage",
    section: "chat",
    term: "short",
  },
  {
    id: "chatNeedInfo",
    kind: "chatStage",
    section: "chat",
    term: "short",
  },
  {
    id: "chatUserCrown",
    kind: "chatStage",
    section: "chat",
    term: "short",
  },
  {
    id: "chatHallucination",
    kind: "chatStage",
    section: "chat",
    term: "short",
  },
  {
    id: "chatCorrection",
    kind: "chatStage",
    section: "chat",
    term: "short",
  },
  {
    id: "chatGaslight",
    kind: "chatStage",
    section: "chat",
    term: "short",
  },
  {
    id: "chatGaslightHold",
    kind: "hold",
    section: "chat",
    term: "long",
  },
  {
    id: "timeLossComposerSettle",
    kind: "transition",
    section: "timeLoss",
    term: "long",
  },
  {
    id: "timeLossBackdropReveal",
    kind: "transition",
    section: "timeLoss",
    term: "long",
  },
  {
    id: "timeLossHold",
    kind: "hold",
    section: "timeLoss",
    term: "long",
  },
] as const satisfies readonly {
  id: string;
  kind: AssignmentHelpStorySceneKind;
  section: AssignmentHelpStorySectionId;
  term: ScrollTerm;
}[];

export type AssignmentHelpStoryScene =
  (typeof ASSIGNMENT_HELP_STORY_SCENE_SEQUENCE)[number];
export type AssignmentHelpStorySceneId = AssignmentHelpStoryScene["id"];

export type AssignmentHelpStorySceneProgress = AssignmentHelpStoryScene & {
  end: number;
  start: number;
};

const roundScrollValue = (value: number) => {
  return Number(value.toFixed(4));
};

const createZeroSectionMap = <Value>(
  value: Value,
): Record<AssignmentHelpStorySectionId, Value> => {
  return {
    intro: value,
    chat: value,
    timeLoss: value,
  };
};

const resolveTermVh = (term: ScrollTerm) => {
  return ASSIGNMENT_HELP_STORY_SCROLL_TERM_VH[term];
};

const createProgressSectionHeight = (travelVh: number) => {
  return roundScrollValue(100 + travelVh);
};

const ASSIGNMENT_HELP_STORY_SECTION_TRAVEL_VH =
  ASSIGNMENT_HELP_STORY_SCENE_SEQUENCE.reduce<
    Record<AssignmentHelpStorySectionId, number>
  >((travelBySection, scene) => {
    travelBySection[scene.section] += resolveTermVh(scene.term);
    return travelBySection;
  }, createZeroSectionMap(0));

export const ASSIGNMENT_HELP_STORY_SECTION_VH: Record<
  AssignmentHelpStorySectionId,
  number
> = ASSIGNMENT_HELP_STORY_SECTION_ORDER.reduce<
  Record<AssignmentHelpStorySectionId, number>
>((sectionHeights, sectionId) => {
  sectionHeights[sectionId] = createProgressSectionHeight(
    ASSIGNMENT_HELP_STORY_SECTION_TRAVEL_VH[sectionId],
  );
  return sectionHeights;
}, createZeroSectionMap(0));

export const ASSIGNMENT_HELP_STORY_SCENE_PROGRESS = (() => {
  const sceneCursorBySection = createZeroSectionMap(0);

  return ASSIGNMENT_HELP_STORY_SCENE_SEQUENCE.reduce<
    Record<AssignmentHelpStorySceneId, AssignmentHelpStorySceneProgress>
  >(
    (progressLookup, scene) => {
      const startVh = sceneCursorBySection[scene.section];
      const endVh = startVh + resolveTermVh(scene.term);
      const sectionTravelVh =
        ASSIGNMENT_HELP_STORY_SECTION_TRAVEL_VH[scene.section];

      sceneCursorBySection[scene.section] = endVh;
      progressLookup[scene.id] = {
        ...scene,
        end: roundScrollValue(endVh / sectionTravelVh),
        start: roundScrollValue(startVh / sectionTravelVh),
      };

      return progressLookup;
    },
    {} as Record<AssignmentHelpStorySceneId, AssignmentHelpStorySceneProgress>,
  );
})();
