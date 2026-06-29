// assumes req.validatedBody already contains trustworthy data
// knows HTTP
// pass this data to authService
// wait for result
// send an success response
// if something goes wrong, pass error onwards

import { registerUser } from "../services/authService.js";

export async function registerController(req, res, next) {
  const data = req.validatedBody;

  try {
    const result = await registerUser(data);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    console.log(error.response);

    if (error.message === "email already exists") {
      return res.status(400).json({
        status: "unsuccessful",
        message: "email already exists",
      });
    } else {
      return res
        .status(500)
        .json({ status: "unsuccessful", message: "DB error" });
    }
  }

  // const result = registerUser(data);

  // return res.status(201).json(result);
}
