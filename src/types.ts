export interface Character {
  id: string;
  name: string;
  image: string;
}

export interface Question {
  id: string;
  text: string;
}

export type Winner = "A" | "B" | "Neutral";

export interface ComparisonResult {
  charAId: string;
  charBId: string;
  answers: Record<string, Winner>;
}

export interface ScoreBoard {
  [characterId: string]: number;
}

export const AppState = {
  PAIR_SELECTION: "PAIR_SELECTION",
  COMPARISON: "COMPARISON",
  RESULTS: "RESULTS",
};
export type AppState = (typeof AppState)[keyof typeof AppState];
