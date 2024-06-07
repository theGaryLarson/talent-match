import bcrypt from 'bcryptjs';

/**
 * Salts and hashes a given password.
 * @param password - plaintext password to be hashed.
 * @returns the salted and hashed password.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Number of salt rounds
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

/**
 * Verifies if a given plaintext password matches a hash.
 * @param password - plaintext password.
 * @param hash - hashed password.
 * @returns true if the passwords match, false otherwise.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}