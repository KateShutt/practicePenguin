import { useState } from "react";
import axios from "axios";
import { isValidEmail } from "../../../shared/validation/email";
import { isValidPassword } from "../../../shared/validation/password";
import { isValidUsername } from "../../../shared/validation/username";

import RedirectModal from "../components/RedirectModal";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  function togglePassword() {
    setPasswordVisible(!passwordVisible);
  }

  function navToLogin() {
    setModalOpen(false);
    navigate("/login");
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      console.log("invalid email!");
      setErrorMessage("invalid email!");
      return;
    }

    if (!isValidUsername(formData.username)) {
      console.log("invalid username!");
      setErrorMessage("invalid username!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log("passwords do not match");
      setErrorMessage("passwords do not match!");
      return;
    }

    if (!isValidPassword(formData.password)) {
      console.log("invalid password!");
      setErrorMessage("invalid password!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      console.log(response.data);
      setErrorMessage("");
      setModalOpen(true);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response.data);
    }
  }

  return (
    <>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button
          type="button" // prevents this button submitting the form
          onClick={togglePassword}
        >
          <p>{passwordVisible ? "Hide password" : "Show password"}</p>
        </button>
        <label>
          Confirm Password:
          <input
            name="confirmPassword"
            type={passwordVisible ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <RedirectModal
        isOpen={modalOpen}
        title="Success!"
        message="Account created!"
        buttonText="Go to Login"
        onButtonClick={navToLogin}
      />
    </>
  );
}

export default Register;
