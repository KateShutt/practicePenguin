import { useState } from "react";
import axios from "axios";
import { isValidEmail } from "../../../shared/validation/email";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  function togglePassword() {
    setPasswordVisible(!passwordVisible);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.email.length === 0) {
      console.log("email must not be empty!");
      setErrorMessage("email required!");
      return;
    } else if (!isValidEmail(formData.email)) {
      console.log("email not valid");
      setErrorMessage("email not valid!");
      return;
    }

    if (formData.password.length === 0) {
      console.log("password must not be empty");
      setErrorMessage("password required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={togglePassword}>
          {passwordVisible ? "Hide password" : "Show password"}
        </button>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default Login;
