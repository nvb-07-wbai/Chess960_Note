export type TabType =
  | 'overview'
  | 'architecture'
  | 'lifecycle-flow'
  | 'code-map'
  | 'code-bot'
  | 'code-search'
  | 'code-eval'
  | 'code-time'
  | 'function-dossiers'
  | 'theory'
  | 'parameters'
  | 'case-studies'
  | 'general-qa'
  | 'member-qa'
  | 'defense-simulator'
  | 'chess960'
  | 'qa'
  | 'practice'
  | 'glossary'
  | 'source-map';

export interface CodeAnnotation {
  id: string;
  file: 'bot.py' | 'search.py' | 'evaluation.py' | 'time_manager.py';
  startLine: number;
  endLine: number;
  title: string;
  purpose: string;
  explanation: string[];
  inputs: string;
  outputs: string;
  systemRole: string;
  defensePoints: string[];
  codeSnippet: string;
  relatedFunctions?: string[];
  relatedQuestionIds?: string[];
}

export interface CodeModule {
  id: string;
  name: string;
  fileName: 'bot.py' | 'search.py' | 'evaluation.py' | 'time_manager.py';
  author: string;
  studentId: string;
  linesCount: number;
  summary: string;
  keyClasses: string[];
  coreFunctions: string[];
  annotations: CodeAnnotation[];
  rawCode: string;
}

export type QuestionCategory =
  | 'general'
  | 'code'
  | 'scenario'
  | 'member'
  | 'parameter'
  | 'member-role'
  | 'member-cross'
  | 'testing'
  | 'search'
  | 'evaluation'
  | 'time-management'
  | 'architecture'
  | 'experiment';
export type QuestionDifficulty = 'basic' | 'medium' | 'advanced';

export interface QAQuestion {
  id: string;
  question: string;
  category: QuestionCategory;
  topic: string;
  difficulty: QuestionDifficulty;
  quickAnswer: string; // 20-45s elevator pitch
  detailedExplanation: string;
  codeReference?: {
    file: string;
    lines: string;
    functionName: string;
  };
  teacherFollowUp: string;
  exampleScenario?: string;
  tags: string[];
}

export interface StructuredAnswer {
  quickPitch: string;
  deepExplanation: string;
  executionFlow?: string[];
  codeRef?: {
    file: string;
    functionName: string;
    lines: string;
  };
  concreteExample?: string;
  teacherFollowUps?: {
    question: string;
    answer: string;
  }[];
  commonMistakes?: string[];
}

export interface DefenseQuestion {
  id: string;
  title: string;
  question: string;
  category: QuestionCategory;
  topic:
    | 'project-overview'
    | 'architecture'
    | 'search'
    | 'evaluation'
    | 'time-management'
    | 'chess960'
    | 'experiment'
    | 'trade-offs'
    | 'code'
    | 'testing';
  memberTarget?: 'bach' | 'long' | 'viet' | 'vuong' | 'all';
  memberRole?: string;
  difficulty: 'basic' | 'medium' | 'advanced';
  answer: StructuredAnswer;
  tags?: string[];
}

export interface FunctionDossier {
  id: string;
  name: string;
  file: string;
  className?: string;
  lineSpan?: string;
  signature: string;
  role: string;
  isCore: boolean;
  inputDescription: string;
  outputDescription: string;
  stepSequence: string[];
  whyChosen: string;
  failureScenario: string;
  teacherTrap: string;
  memoryDefense: string;
}

export interface ParameterDossier {
  id: string;
  name: string;
  file: string;
  functionOrScope?: string;
  currentValue: string;
  unit?: string;
  category: 'search' | 'time' | 'eval' | 'pruning' | 'memory' | string;
  originType?: 'theoretical' | 'formula-derived' | 'heuristic-designed' | 'benchmark-tuned' | 'empirical-default' | string;
  roleInAlgorithm?: string;
  whyChosen: string;
  ifIncreased: string;
  ifDecreased: string;
  whyNotOther?: string;
  experimentalProof?: string;
  defenseScript: string;
}

export interface CaseStudyDossier {
  id: string;
  matchId: string;
  frcId: number;
  moveNumber: number;
  color: 'Trắng' | 'Đen';
  movePlayed: string;
  thinkingTimeMs: number;
  evalScore: string;
  deltaCp: string;
  outcomeType: 'mate' | 'timeout-win' | 'material-gain' | 'missed-win' | 'draw' | 'depth-barrier' | string;
  tacticalTheme: string;
  boardStateDesc: string;
  tacticalIssue: string;
  botChoiceReason: string;
  keyAlgorithmResponsible: string;
  relatedFunctions?: string[];
  activeHeuristicOrThreshold?: string;
  betterAlternative?: string;
  actualOutcome: string;
  ifRedoneHowToImprove: string;
  teacherDefenseNotes: string;
}

export interface AlgorithmTopic {
  id: string;
  title: string;
  category: string;
  definition: string;
  principle: string;
  formula?: string;
  pseudocode?: string;
  team12Implementation: {
    file: string;
    functionName: string;
    lines: string;
    description: string;
    rationale: string;
    limitations: string;
  };
  defensePoints: string[];
  widgetType?: 'tree' | 'chessboard' | 'time-calculator' | 'move-order' | 'tt-table';
}

export interface ArchitectureNode {
  id: string;
  name: string;
  layer: 'external' | 'controller' | 'search' | 'memory' | 'evaluation' | 'timing';
  file: string;
  role: string;
  callers: string[];
  callees: string[];
  keyFunctions: string[];
  defensePitch: string;
  codeSnippet: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  vietnamese: string;
  category: 'search' | 'chess' | 'evaluation' | 'architecture' | 'optimization';
  shortDef: string;
  fullExplanation: string;
  example: string;
  relatedTab?: TabType;
  relatedTopicId?: string;
}

export interface TeamMember {
  name: string;
  studentId: string;
  github: string;
  role: string;
  responsibilities: string[];
  defenseTopics: string[];
  selfContribution: string;
  aiAssistance: string;
}
