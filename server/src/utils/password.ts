import bcrypt from "bcrypt";

// Utility function to hash passwords
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
  return await bcrypt.hash(password, salt); // Hash the password
};

// Utility function to compare plain text password with hashed password
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword); // Compare the passwords
};
