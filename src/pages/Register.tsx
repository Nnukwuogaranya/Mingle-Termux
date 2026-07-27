import React, { useState } from "react";
import "./Auth.css";

import { registerUser } from "../services/auth";


type RegisterProps = {
  onRegister?: () => void;
};


export default function Register({
  onRegister,
}: RegisterProps) {


  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");  cons  const [loading, setLoading] = useState(false);



  const register = async () => {

    setError("");
    setSuccess("");


    if (!name || !email || !password) {

      setError(
        "Please fill all fields."
      );

      return;

    }


    try {

      setLoading(true);


      await registerUser(
        name,
        email,
        password
      );


      setSuccess(
        "Account created successfully!"
      );


      if (onRegister) {
        onRegister();
      }



    } catch (err: any) {

      setError(
        err.message ||
        "Registration failed."
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="auth-page">

      <div className="auth-card">


        <div className="auth-logo">
          M
        </div>


        <h1>
          Join Mingle
        </h1>


        <p>
          Create your account and belong.
        </p>



        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}



        {success && (
          <div className="auth-success">
            {success}
          </div>
        )}



        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />



        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />



        <div className="password-box">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          <button
            type="button"
            className="eye-button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >

            {showPassword ? "🙈" : "👁️"}

          </button>


        </div>




        <button
          onClick={register}
          disabled={loading}
        >

          {loading
            ? "Creating..."
            : "Create Account"
          }

        </button>



        <button className="pi-button">
          🟣 Join with Pi
        </button>



      </div>

    </div>

  );

}
