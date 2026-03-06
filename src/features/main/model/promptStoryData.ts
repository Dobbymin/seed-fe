export type PromptRichBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "ordered-list";
      items: string[];
    };

export type PromptMessage = {
  id: string;
  role: "user" | "ai";
  content: string | PromptRichBlock[];
};

const paragraph = (text: string): PromptRichBlock => ({
  type: "paragraph",
  text,
});

const orderedList = (items: string[]): PromptRichBlock => ({
  type: "ordered-list",
  items,
});

const createUserMessage = (id: string, text: string): PromptMessage => ({
  id,
  role: "user",
  content: text,
});

const createAiMessage = (
  id: string,
  content: PromptRichBlock[],
): PromptMessage => ({
  id,
  role: "ai",
  content,
});

export const COPY = {
  title: {
    prefix: "혹시 AI에게 ",
    highlight: "‘과제 도와줘’",
    suffix: "라고만 질문하고 계신가요?",
  },
  problemDefinitionNextTitle: {
    prefix: "직접 프롬프트를 짜느라 ",
    highlight: "시간을 버리고",
    suffix: " 있진 않나요",
  },
  solutionTitle: {
    prefix: "프롬프트 고민은 ",
    logo: "SEED",
    middle: "가 합니다. ",
    highlight: "실행",
    suffix: "만 하세요.",
  },
  placeholder: "AI에게 물어보기",
  helpPrompt: "과제 도와줘",
  subtitles: {
    common:
      "같은 AI여도 어떤 프롬프트를 쓰느냐에 따라 결과는 하늘과 땅 차이입니다.",
    methodology: "AI가 과제를 바로 해주지 않고 방법론으로만 설명하진 않나요?",
    tooManyInfo:
      "AI가 요구하는 정보가 너무 많아 시작조차 하기 힘든 경우는 없었나요?",
    hallucination: "AI가 그럴듯한 거짓말을 하진 않던가요?",
    repeatMistake: "AI에게 지적을 해도 같은 실수를 반복하지 않나요?",
  },
} as const;

const AI_METHOD_GUIDE: PromptRichBlock[] = [
  paragraph(
    "네, 과제 작성 도와드릴게요. 과제를 잘 마치려면 다음 순서로 진행해 보세요.",
  ),
  orderedList([
    "**주제 확정**: 구체적이고 명확한 주제를 정해요.",
    "**자료 조사**: 신뢰할 수 있는 자료와 논문을 먼저 모아요.",
    "**개요 작성**: 서론-본론-결론 구조를 먼저 설계해요.",
    "**초안 작성**: 완벽함보다 빠른 초안 작성이 우선이에요.",
  ]),
  paragraph("원하면 단계별로 바로 같이 작성해볼까요?"),
];

const AI_NEED_MORE_INFO: PromptRichBlock[] = [
  paragraph("도와드리기 위해 몇 가지 정보가 더 필요해요."),
  orderedList([
    "**과제 주제**가 무엇인지",
    "**제출 형식**과 **분량**",
    "반드시 포함해야 할 **핵심 키워드**",
    "금지 조건 또는 **평가 기준**",
    "원하는 문체와 난이도",
  ]),
  paragraph("이 정보를 주시면 바로 초안부터 만들어드릴 수 있어요."),
];

const AI_HALLUCINATION: PromptRichBlock[] = [
  paragraph(
    "현재 정보만으로는 사실 검증이 어려워서 부정확한 내용이 포함될 수 있어요.",
  ),
  paragraph(
    "예를 들어 확인되지 않은 출처를 사실처럼 제시하거나, 존재하지 않는 자료를 인용하는 문제가 발생할 수 있습니다.",
  ),
];

const AI_GASLIGHT: PromptRichBlock[] = [
  paragraph("아, 제가 앞서 잘못된 정보를 제시했을 가능성이 있습니다."),
  paragraph(
    "정확한 결과를 위해서는 출처를 재검증하고, 과제물 기준으로 근거를 다시 정리하는 과정이 필요해요.",
  ),
  paragraph("이번에는 근거 중심으로 다시 정확히 작성해볼게요."),
];

export const MESSAGE_BANK = {
  userHelp: createUserMessage("user-help", COPY.helpPrompt),
  aiMethod: createAiMessage("ai-method", AI_METHOD_GUIDE),
  aiNeedInfo: createAiMessage("ai-need-info", AI_NEED_MORE_INFO),
  userCrown: createUserMessage(
    "user-crown",
    "좋은 자료를 기반으로 과제 방향부터 잡아줘. 제출용 글이야.",
  ),
  aiHallucination: createAiMessage("ai-hallucination", AI_HALLUCINATION),
  userCorrection: createUserMessage(
    "user-correction",
    "아니, 그건 사실이 아닌 것 같은데? 정확한 근거로 다시 알려줘.",
  ),
  aiGaslight: createAiMessage("ai-gaslight", AI_GASLIGHT),
} as const;

export type MessageKey = keyof typeof MESSAGE_BANK;

export const resolveMessageIds = (ids: readonly MessageKey[]) => {
  return ids.map((id) => MESSAGE_BANK[id]);
};
