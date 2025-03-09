import { LongTermGoal } from "../../../core/interfaces/structure-goals.interface";

const mockStructure: Array<LongTermGoal> = [];

export const MockLongTermGoalsService = {
  structure: (): Array<LongTermGoal> => mockStructure,
  saveGoals: (goals: Array<LongTermGoal>) => ({}),
};