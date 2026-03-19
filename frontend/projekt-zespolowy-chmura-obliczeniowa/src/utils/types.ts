export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export interface Note {
  id: string;
  title: string;
  content: string;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
}
