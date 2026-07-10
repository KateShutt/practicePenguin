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

    return res.status(200).json(result);
  } catch (error) {}
}
