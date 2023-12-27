export type OverviewData = {
  workoutId: string;
  sessionName: string;
  exercises: Exercise[];
};

type Exercise = {
  exercise: string;
  sets: number;
};

const data: OverviewData[] = [
  {
    workoutId: "0000-0000-0000-0000",
    sessionName: "Push",
    exercises: [
      {
        exercise: "Benk",
        sets: 3,
      },
      {
        exercise: "DB Flyes",
        sets: 3,
      },
      {
        exercise: "Tri pulldowns",
        sets: 3,
      },
    ],
  },
];

export const getOverview = (workoutId: string) => {
  return data.find((e) => e.workoutId == workoutId);
};
