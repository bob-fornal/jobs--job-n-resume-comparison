export interface ChecklistItem {
  title: string;
  finished: boolean;
  description: string;
}

export interface LongTermGoal {
  title: string;
  description: string;
  summary: string;
  checklist: Array<ChecklistItem>;
}