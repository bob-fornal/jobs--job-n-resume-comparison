
import { Goal } from "./goal.interface";
import { Item } from "./item.interface"

export interface Structure {
  useGoals: boolean;
  useNotes: boolean;

  days: Array<Item>;
  goals: Array<Goal>;
}
