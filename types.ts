
export interface SkillAnalysis {
  skill: string;
  score: number;
  reasoning: string;
}

export interface AnalysisResult {
  matchScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  skillAnalysis: SkillAnalysis[];
}
