declare global {
  type TOutcome = "raja" | "mantri" | "chor" | "sipahi";
  interface TPlayer {
    name: string;
    outcomes: TOutcome[];
  }
}

export {};
