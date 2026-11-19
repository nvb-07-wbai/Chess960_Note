export type TabType =
  | 'overview'
  | 'architecture'
  | 'code-bot'
  | 'code-search'
  | 'code-eval'
  | 'code-time'
  | 'theory'
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

export type QuestionCategory = 'general' | 'code' | 'scenario';
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
