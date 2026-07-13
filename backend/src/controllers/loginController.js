// assumes req.validatedBody already contains trustworthy data
// knows HTTP
// pass this data to authService
// wait for result
// send an success response
// if something goes wrong, pass error onwards

import { loginUser } from "../services/authService.js";

export async function loginController(req, res) {
  //console.log(req.validatedData.email);

  const data = req.validatedData;

  try {
    const result = await loginUser(data);

    console.log(result);

    return res.status(200).json(result);
  } catch (error) {
    if (error.code === "INVALID_CREDENTIALS") {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.error("login failed", error);
    return res.status(500).json({ message: "Unable to log in at this time" });
  }
}
