// this file checks incoming data - all fields present / correct

import { isValidEmail } from "../../../shared/validation/email.js";

import { isValidUsername } from "../../../shared/validation/username.js";

import { isValidPassword } from "../../../shared/validation/password.js";

export function validateRegister(req, res, next) {
  const formData = req.body || {};

  const { email, username, password, confirmPassword } = formData || {};

  const allowedFields = new Set([
    "email",
    "username",
    "password",
    "confirmPassword",
  ]);

  // checking that incoming req does not have unknown fields

  for (let key of Object.keys(formData)) {
    if (!allowedFields.has(key)) {
      console.log("unknown fields not allowed!");
      return res.status(400).json({ error: "unknown fields not allowed!" });
    }
  }

  // checking all fields are present / correct format

  // check type of data

  if (typeof email !== "string") {
    return res.status(400).json({ error: "email must be a string" });
  }

  if (typeof username !== "string") {
    return res.status(400).json({ error: "username must be a string" });
  }

  if (typeof password !== "string") {
    return res.status(400).json({ error: "password must be a string" });
  }

  if (typeof confirmPassword !== "string") {
    return res.status(400).json({ error: "confirmPassword must be a string" });
  }

  // clean email / username

  const cleanEmail = email.trim().toLowerCase();

  const cleanUsername = username.trim().toLowerCase();

  // check all fields are present

  if (cleanEmail.length === 0) {
    return res.status(400).json({ error: "email required" });
  }

  if (cleanUsername.length === 0) {
    return res.status(400).json({ error: "username required" });
  }

  if (password.length === 0) {
    return res.status(400).json({ error: "password required" });
  }

  if (confirmPassword.length === 0) {
    return res.status(400).json({ error: "confirmPassword required" });
  }

  // check all fields are valid

  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: "invalid email" });
  }

  if (!isValidUsername(cleanUsername)) {
    return res.status(400).json({ error: "invalid username" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ error: "invalid password" });
  }

  // check password matches confirm password

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "passwords do not match" });
  }

  req.validatedBody = {
    email: cleanEmail,
    username: cleanUsername,
    password,
  };

  next();
}
