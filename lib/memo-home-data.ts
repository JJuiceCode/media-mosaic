export type RecordStatus = "verified" | "partial" | "context" | "rebuttal" | "checking" | "false";

export type PersonRecord = {
  id: string;
  rank: number;
  name: string;
  role: string;
  organization: string;
  imageUrl: string;
  summary: string;
  positiveCount: number;
  controversyCount: number;
  correctionCount: number;
  pendingCount: number;
  sourceCount: number;
  lastUpdated: string;
  highlights: string[];
  timeline: {
    date: string;
    title: string;
    status: RecordStatus;
    sourceLabel: string;
  }[];
};

export type FactCheckRecord = {
  id: string;
  title: string;
  personName: string;
  status: RecordStatus;
  occurredAt: string;
  checkedAt: string;
  summary: string;
  sourceCount: number;
};

export type IssueTrend = {
  id: string;
  name: string;
  peopleCount: number;
  recordCount: number;
  lastUpdated: string;
};

export type MethodologyStep = {
  id: string;
  title: string;
  description: string;
};

export type ParticipationCard = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
};

export const statusLabels: Record<RecordStatus, string> = {
  verified: "사실 확인",
  partial: "부분 사실",
  context: "맥락 필요",
  rebuttal: "반론 존재",
  checking: "검증 중",
  false: "허위 확인",
};

export const statusStyles: Record<RecordStatus, string> = {
  verified: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200",
  partial: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200",
  context: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200",
  rebuttal: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-200",
  checking: "border-neutral-200 bg-neutral-100 text-neutral-700 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200",
  false: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-200",
};

const portrait = (seed: string, bg: string, fg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img"><rect width="160" height="160" fill="${bg}"/><circle cx="80" cy="62" r="30" fill="${fg}" opacity=".92"/><path d="M30 148c8-37 29-58 50-58s42 21 50 58" fill="${fg}" opacity=".78"/><text x="80" y="153" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="white" opacity=".82">${seed}</text></svg>`,
  )}`;

export const featuredPositivePeople: PersonRecord[] = [
  {
    id: "positive-1",
    rank: 1,
    name: "김도윤",
    role: "전 국회의원",
    organization: "공공정책연구회",
    imageUrl: portrait("KD", "#dbeafe", "#2563eb"),
    summary: "공약 이행 자료, 공개 회의록, 정정 대응 기록이 함께 누적된 인물 기록입니다.",
    positiveCount: 42,
    controversyCount: 7,
    correctionCount: 5,
    pendingCount: 3,
    sourceCount: 138,
    lastUpdated: "2026.06.27",
    highlights: ["청년 주거 공약 이행 자료 공개", "예산 집행 내역 추가 출처 반영", "보도자료 오류 정정 요청 수용"],
    timeline: [
      { date: "2026.06.27", title: "청년 주거 공약 이행률 관련 공개 자료 갱신", status: "verified", sourceLabel: "국회 회의록" },
      { date: "2026.06.19", title: "지역 공공시설 예산 설명 발언에 추가 맥락 반영", status: "context", sourceLabel: "지자체 자료" },
      { date: "2026.06.03", title: "인터뷰 인용 수치 정정 내역 업데이트", status: "rebuttal", sourceLabel: "언론 정정문" },
    ],
  },
  {
    id: "positive-2",
    rank: 2,
    name: "이하린",
    role: "시민단체 활동가",
    organization: "열린자료센터",
    imageUrl: portrait("LH", "#dcfce7", "#16a34a"),
    summary: "정보공개 청구와 자료 검증 협업 이력이 많이 확인되었습니다.",
    positiveCount: 35,
    controversyCount: 3,
    correctionCount: 4,
    pendingCount: 2,
    sourceCount: 102,
    lastUpdated: "2026.06.25",
    highlights: ["공공데이터 공개 요구", "정책 검증 자료 공동 정리"],
    timeline: [{ date: "2026.06.25", title: "공공데이터 공개 요청 결과 반영", status: "verified", sourceLabel: "정보공개포털" }],
  },
  {
    id: "positive-3",
    rank: 3,
    name: "박서준",
    role: "언론인",
    organization: "시민뉴스",
    imageUrl: portrait("PS", "#e0e7ff", "#4f46e5"),
    summary: "정정 보도와 후속 취재 공개 기록이 꾸준히 누적되었습니다.",
    positiveCount: 31,
    controversyCount: 6,
    correctionCount: 8,
    pendingCount: 1,
    sourceCount: 96,
    lastUpdated: "2026.06.22",
    highlights: ["후속 취재 링크 추가", "정정 보도 이력 정리"],
    timeline: [{ date: "2026.06.22", title: "후속 보도 출처 4건 추가", status: "rebuttal", sourceLabel: "언론사 지면" }],
  },
  {
    id: "positive-4",
    rank: 4,
    name: "정민재",
    role: "전 공직자",
    organization: "지방행정포럼",
    imageUrl: portrait("JM", "#ccfbf1", "#0d9488"),
    summary: "회의록과 감사 자료 기반의 투명성 기록이 확인되었습니다.",
    positiveCount: 28,
    controversyCount: 4,
    correctionCount: 2,
    pendingCount: 4,
    sourceCount: 81,
    lastUpdated: "2026.06.21",
    highlights: ["감사 자료 링크 갱신"],
    timeline: [{ date: "2026.06.21", title: "감사 결과 공개 문서 연결", status: "verified", sourceLabel: "감사 보고서" }],
  },
  {
    id: "positive-5",
    rank: 5,
    name: "최유진",
    role: "정책 유튜버",
    organization: "팩트노트",
    imageUrl: portrait("CY", "#fef3c7", "#d97706"),
    summary: "발언 원문과 자료 출처를 함께 공개한 기록이 많습니다.",
    positiveCount: 24,
    controversyCount: 5,
    correctionCount: 6,
    pendingCount: 2,
    sourceCount: 74,
    lastUpdated: "2026.06.18",
    highlights: ["영상 설명란 원출처 추가"],
    timeline: [{ date: "2026.06.18", title: "영상 내 통계 출처 보강", status: "partial", sourceLabel: "영상 설명" }],
  },
];

export const featuredControversialPeople: PersonRecord[] = [
  {
    id: "controversy-1",
    rank: 1,
    name: "장현우",
    role: "현직 국회의원",
    organization: "국회 산업위원회",
    imageUrl: portrait("JH", "#ffedd5", "#ea580c"),
    summary: "의혹 보도, 반론, 추가 검증 요청이 함께 누적되어 맥락 확인이 필요한 기록입니다.",
    positiveCount: 12,
    controversyCount: 39,
    correctionCount: 11,
    pendingCount: 9,
    sourceCount: 126,
    lastUpdated: "2026.06.28",
    highlights: ["토론회 발언의 통계 출처 검토", "이해충돌 의혹 보도와 반론문 연결", "후속 정정 요청 접수"],
    timeline: [
      { date: "2026.06.28", title: "산업 보조금 발언 통계 원자료 대조", status: "context", sourceLabel: "정부 통계" },
      { date: "2026.06.20", title: "이해충돌 의혹 보도에 당사자 반론 추가", status: "rebuttal", sourceLabel: "서면 답변" },
      { date: "2026.06.08", title: "지역 간담회 발언 검증 요청 접수", status: "checking", sourceLabel: "제보 자료" },
    ],
  },
  {
    id: "controversy-2",
    rank: 2,
    name: "오세린",
    role: "방송 진행자",
    organization: "시사브리핑",
    imageUrl: portrait("OS", "#fee2e2", "#dc2626"),
    summary: "방송 발언의 수치 인용과 정정 요청 기록이 확인되었습니다.",
    positiveCount: 9,
    controversyCount: 34,
    correctionCount: 10,
    pendingCount: 5,
    sourceCount: 91,
    lastUpdated: "2026.06.26",
    highlights: ["방송 클립 원문 대조"],
    timeline: [{ date: "2026.06.26", title: "실업률 인용 발언 원자료 비교", status: "partial", sourceLabel: "통계청" }],
  },
  {
    id: "controversy-3",
    rank: 3,
    name: "문태오",
    role: "정책 평론가",
    organization: "오픈토론",
    imageUrl: portrait("MT", "#e5e7eb", "#525252"),
    summary: "정책 공약 해석을 둘러싼 반론과 맥락 자료가 누적되었습니다.",
    positiveCount: 14,
    controversyCount: 29,
    correctionCount: 7,
    pendingCount: 6,
    sourceCount: 88,
    lastUpdated: "2026.06.23",
    highlights: ["공약집 원문 링크 추가"],
    timeline: [{ date: "2026.06.23", title: "공약 해석 관련 반론 자료 연결", status: "rebuttal", sourceLabel: "공약집" }],
  },
  {
    id: "controversy-4",
    rank: 4,
    name: "서아영",
    role: "기초단체장",
    organization: "동부시",
    imageUrl: portrait("SA", "#fce7f3", "#db2777"),
    summary: "개발 사업 발언과 관련 문서의 시점 차이가 검토되었습니다.",
    positiveCount: 18,
    controversyCount: 25,
    correctionCount: 4,
    pendingCount: 5,
    sourceCount: 77,
    lastUpdated: "2026.06.20",
    highlights: ["사업 계획서 시점 비교"],
    timeline: [{ date: "2026.06.20", title: "개발 사업 일정 발언에 맥락 표시", status: "context", sourceLabel: "사업 계획서" }],
  },
  {
    id: "controversy-5",
    rank: 5,
    name: "한지율",
    role: "유튜브 채널 운영자",
    organization: "뉴스랩",
    imageUrl: portrait("HJ", "#ede9fe", "#7c3aed"),
    summary: "영상 발언의 근거 자료 요청과 반론 링크가 함께 정리되었습니다.",
    positiveCount: 7,
    controversyCount: 22,
    correctionCount: 5,
    pendingCount: 8,
    sourceCount: 64,
    lastUpdated: "2026.06.17",
    highlights: ["영상 인용 기사 원문 확인"],
    timeline: [{ date: "2026.06.17", title: "영상 발언 출처 요청 상태 업데이트", status: "checking", sourceLabel: "제보 자료" }],
  },
];

export const latestFactChecks: FactCheckRecord[] = [
  {
    id: "fact-1",
    status: "context",
    title: "재정 지출 증가율이 역대 최고라는 토론회 발언",
    personName: "장현우",
    occurredAt: "2026.06.24",
    checkedAt: "2026.06.28",
    summary: "명목 지출 기준으로는 높지만, 물가와 추경 반영 여부에 따라 해석이 달라 맥락 표시가 필요합니다.",
    sourceCount: 6,
  },
  {
    id: "fact-2",
    status: "verified",
    title: "공공임대 공급 실적 관련 브리핑 자료",
    personName: "김도윤",
    occurredAt: "2026.06.21",
    checkedAt: "2026.06.27",
    summary: "정부 공개 통계와 지자체 자료가 발언의 핵심 수치를 뒷받침하는 것으로 확인되었습니다.",
    sourceCount: 8,
  },
  {
    id: "fact-3",
    status: "rebuttal",
    title: "지역 개발 사업 특혜 의혹 보도",
    personName: "서아영",
    occurredAt: "2026.06.18",
    checkedAt: "2026.06.26",
    summary: "보도 내용과 함께 당사자 반론, 사업 심의 회의록, 후속 자료를 연결했습니다.",
    sourceCount: 9,
  },
  {
    id: "fact-4",
    status: "partial",
    title: "방송에서 인용한 청년 실업률 수치",
    personName: "오세린",
    occurredAt: "2026.06.15",
    checkedAt: "2026.06.24",
    summary: "인용 수치 일부는 공식 통계와 일치하지만 비교 기간 설명이 빠져 부분 사실로 분류했습니다.",
    sourceCount: 5,
  },
  {
    id: "fact-5",
    status: "checking",
    title: "영상에서 언급한 선거 비용 추정치",
    personName: "한지율",
    occurredAt: "2026.06.13",
    checkedAt: "2026.06.22",
    summary: "원자료와 산출 근거를 확인 중이며, 추가 출처 제보를 받고 있습니다.",
    sourceCount: 3,
  },
  {
    id: "fact-6",
    status: "false",
    title: "회의록에 특정 안건이 없었다는 발언",
    personName: "문태오",
    occurredAt: "2026.06.10",
    checkedAt: "2026.06.19",
    summary: "공개 회의록에서 해당 안건과 표결 기록이 확인되어 발언 내용은 사실과 다른 것으로 정리했습니다.",
    sourceCount: 4,
  },
];

export const issueTrends: IssueTrend[] = [
  { id: "issue-1", name: "선거", peopleCount: 48, recordCount: 216, lastUpdated: "2026.06.28" },
  { id: "issue-2", name: "부동산", peopleCount: 31, recordCount: 144, lastUpdated: "2026.06.27" },
  { id: "issue-3", name: "언론 보도", peopleCount: 42, recordCount: 198, lastUpdated: "2026.06.26" },
  { id: "issue-4", name: "유튜브 발언", peopleCount: 27, recordCount: 121, lastUpdated: "2026.06.25" },
  { id: "issue-5", name: "정책 공약", peopleCount: 56, recordCount: 267, lastUpdated: "2026.06.25" },
  { id: "issue-6", name: "정정 보도", peopleCount: 18, recordCount: 79, lastUpdated: "2026.06.22" },
  { id: "issue-7", name: "판결/수사", peopleCount: 22, recordCount: 84, lastUpdated: "2026.06.21" },
  { id: "issue-8", name: "공익 활동", peopleCount: 35, recordCount: 132, lastUpdated: "2026.06.19" },
];

export const participationCards: ParticipationCard[] = [
  { id: "request", title: "검증 요청", description: "발언, 기사, 영상 등 검증이 필요한 기록을 제보합니다.", actionLabel: "검증 요청하기" },
  { id: "source", title: "출처 제보", description: "이미 정리된 기록에 원문, 회의록, 공식 자료 등 추가 출처를 제공합니다.", actionLabel: "출처 제보하기" },
  { id: "correction", title: "정정/반론 요청", description: "당사자 또는 독자가 정정, 반론, 업데이트가 필요한 내용을 요청합니다.", actionLabel: "정정 요청하기" },
];

export const methodologySteps: MethodologyStep[] = [
  { id: "step-1", title: "제보 접수", description: "사용자 제보 또는 공개 자료를 통해 기록 후보를 수집합니다." },
  { id: "step-2", title: "출처 확인", description: "기사, 공식 문서, 영상, 회의록 등 공개 출처를 대조합니다." },
  { id: "step-3", title: "상태 분류", description: "사실 확인, 부분 사실, 맥락 필요, 반론 존재, 검증 중 등으로 분류합니다." },
  { id: "step-4", title: "수정 이력 관리", description: "정정 요청, 반론, 추가 출처, 상태 변경 이력을 남깁니다." },
];
