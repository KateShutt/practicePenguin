import { useState } from "react";
import axios from "axios";
import { isValidEmail } from "../../../shared/validation/email";
import RedirectModal from "../components/RedirectModal";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  function togglePassword() {
    setPasswordVisible(!passwordVisible);
  }

  function goToDashboard() {
    setModalOpen(false);
    navigate("/dashboard");
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
      console.log(response.data);
      setErrorMessage("");
      setModalOpen(true);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
      console.log(error.response?.status);

      //sometimes we might not get 400 / 500 error. This means there will be no error.response. Chaining prevents program from cracshing in this case.
      setErrorMessage(
        error.response?.data?.message ||
          "Unable to connect to server. Please try again",
      );
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
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <RedirectModal
        isOpen={modalOpen}
        title="Hurrah!"
        message="You have successfully logged in!"
        buttonText="Go to dashboard"
        onButtonClick={goToDashboard}
      />
    </>
  );
}

export default Login;
