export const getFromObj = (
  obj: any,
  path: string,
  defaultValue = undefined
) => {
  // Convert dot notation to array notation
  const pathArray = Array.isArray(path)
    ? path
    : path.split(".").filter(Boolean);

  // Reduce over the pathArray to access the nested properties
  return pathArray.reduce(
    (acc, key) => (acc && acc[key] !== "undefined" ? acc[key] : defaultValue),
    obj
  );
};
