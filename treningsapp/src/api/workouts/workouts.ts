import { WorkoutProps } from "@/app/workouts/page";

export const getWorkouts = () => {
  const workoutList: WorkoutProps[] = [
    {
      name: "Push",
      date: new Date(),
    },
    {
      name: "Pull",
      date: new Date(new Date(2000000000000)),
    },
  ];
  return workoutList;
};
