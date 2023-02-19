export const sanitizeArray = (value: any) => {
  return Array.isArray(value) ? [...value] : [];
};
