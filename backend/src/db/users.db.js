//this function queries the DB to see if a user exists with this email address
// knows a about SQL only

import pool from "./connection.js";

export async function findUserByEmail(email) {
  try {
    const [rows] = await pool.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      return null;
    } else {
      return rows[0];
    }
  } catch (error) {
    throw error;
  }
}
