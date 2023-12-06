import { Team } from "./Team";

export type Player = {
  first_name: string;
  height_feet: number;
  height_inches: number;
  id: number;
  last_name: string;
  position: string;
  team: Team;
  weight_pounds: number;
};
