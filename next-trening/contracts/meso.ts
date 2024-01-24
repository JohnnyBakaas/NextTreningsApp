export type Meso = {
  name: string;
  sessions: MesoSessionData[];
};

export type MesoSessionData = {
  name: string; // Push, Pull, Legs, Full Body, Upper, Lower, Custom
  exercises: Exercise[];
  day: DayIndex;
  completed: boolean;
};

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Exercise = {
  name: string;
  sets: number;
  completed: boolean;
};

export type Set = {
  reps: number;
  weight: number;
  rir: number;
  notes: string;
};
