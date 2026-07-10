// this file checks that email / password are present and valid

import { isValidEmail } from "../../../shared/validation/email.js";
import { isValidPassword } from "../../../shared/validation/password.js";

export function validateLogin(req, res, next) {
  const formData = req.body;

  const { email, password } = formData || {};

  const allowedFields = new Set(["email", "password"]);

  for (let key of Object.keys(formData)) {
    if (!allowedFields.has(key)) {
      console.log("unknown fields not allowed!");
      return res.status(400).json({ error: "unknown fields not allowed!" });
    }
  }

  if (typeof email !== "string" || email.trim().length === 0) {
    console.log("email must be a non-empty string");
    return res.status(400).json({ error: "email required" });
  }

  if (!isValidEmail(email)) {
    console.log("invalid email");
    return res.status(400).json({ error: "invalid email" });
  }

  if (typeof password !== "string" || password.length === 0) {
    console.log("password must be a non-empty string");
    return res.status(400).json({ error: "password required!" });
  }

  if (!isValidPassword(password)) {
    console.log("invalid password");
    return res.status(400).json({ error: "invalid password!" });
  }

  req.validatedData = { email, password };

  next();
}
