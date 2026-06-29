// this file is in charge of the registration work
// knows business rules

import { findUserByEmail } from "../db/users.db.js";

export async function registerUser(data) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("email already exists");
  }

  return { email: data.email, username: data.username };
}
