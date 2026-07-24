import React, { useState } from "react";
import "./Auth.css";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const register = () => {

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Welcome to Mingle 🎉");
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          M
        </div>


        <h1>Join Mingle</h1>

        <p>
          Where People Don't Just Connect… They Belong.
        </p>


        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />


        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />


        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />


        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />


        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />


        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />


        <button onClick={register}>
          Create Mingle Account
        </button>


        <button className="pi-button">
          🟣 Continue with Pi
        </button>


        <button className="finger-button">
          🔐 Use Fingerprint Login
        </button>


      </div>

    </div>
  );
}
