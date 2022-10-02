export const truncate = (str: string, maxLength: number) => {
  let trimmedString = str.substring(0, maxLength);
  return (
    trimmedString.substring(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    ) + "..."
  );
};
