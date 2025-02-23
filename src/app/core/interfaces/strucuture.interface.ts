
import { Goal } from "./goal.interface";
import { Item } from "./item.interface"

export interface Structure {
  days: Array<Item>;
  goals: Array<Goal>;
}
