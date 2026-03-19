import { Priority } from "./types";

export const PriorityName: Record<Priority, string> = {
  [Priority.Low]: "Low",
  [Priority.Medium]: "Medium",
  [Priority.High]: "High",
};

export const PriorityType: Record<Priority, "success" | "warning" | "danger"> =
  {
    [Priority.Low]: "success",
    [Priority.Medium]: "warning",
    [Priority.High]: "danger",
  };
