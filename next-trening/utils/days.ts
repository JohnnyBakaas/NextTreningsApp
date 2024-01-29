export const days = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

export const getDay = (dayIndex: number) => {
  if (days[dayIndex]) return days[dayIndex];
  return days[0];
};

export const getDayIndex = (day: string) => {
  const dayIndex = days.indexOf(day);
  if (dayIndex == -1) return 0;
  return dayIndex;
};
