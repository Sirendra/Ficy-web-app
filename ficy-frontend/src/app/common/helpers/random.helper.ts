export const getThreeUniqueRandomNumbers = (max: number): number[] => {
  const set = new Set<number>();
  while (set.size < 3) {
    const num = Math.floor(Math.random() * max) + 1;
    set.add(num);
  }
  return Array.from(set);
};
