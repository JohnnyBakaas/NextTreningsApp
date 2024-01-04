export type SetData = {
  setId: string;
  exercise: string;
  vide?: string;
  weight: number;
  reps: number;
  rir: number;
};

const data: SetData[] = [
  {
    setId: "0000-0000-0000-0000",
    exercise: "Benk",
    vide: "string",
    weight: 60,
    reps: 6,
    rir: 2,
  },
  {
    setId: "0000-0000-0000-0001",
    exercise: "Benk",
    vide: "string",
    weight: 60,
    reps: 6,
    rir: 2,
  },
];

export const getSet = (setId: string) => {
  return data.find((e) => e.setId == setId);
};
