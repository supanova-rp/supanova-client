export const sanitiseArray = <T>(a: T[] | null | undefined): T[] => {
  return Array.isArray(a) ? a : [];
};
