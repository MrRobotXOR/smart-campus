import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import { registerApi } from "../../api/auth.api";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    branch: "",
    year: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerApi(form);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <AuthLayout title="Create Account">
      <form className="register-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" className="auth-input" onChange={handleChange}/>
        <input name="email" placeholder="College Email" className="auth-input" onChange={handleChange}/>
        <input name="rollNo" placeholder="Roll Number" className="auth-input" onChange={handleChange}/>
        <input name="branch" placeholder="Branch" className="auth-input" onChange={handleChange}/>
        <input name="year" placeholder="Year" className="auth-input" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" className="auth-input" onChange={handleChange}/>

        {error && <div className="auth-error">{error}</div>}

        <button className="auth-button">Register</button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </AuthLayout>
  );
}

export default Register;