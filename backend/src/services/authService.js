// this file is in charge of the registration work
// knows business rules

import bcrypt from "bcrypt";

import { findUserByEmail } from "../db/users.db.js";

import { createUser } from "../db/users.db.js";

export async function registerUser(data) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("email already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await createUser(data.username, data.email, passwordHash);

  return { username: user.username, email: user.email };
}

export async function loginUser(data) {
  //findUserByEmail(data.email);
  const user = await findUserByEmail(data.email);

  if (user === null) {
    throw new Error("email doesn't exist");
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password_hash);

  if (!passwordMatch) {
    throw new Error("passwords do not match");
  }

  return { username: user.username, email: user.email };
}
