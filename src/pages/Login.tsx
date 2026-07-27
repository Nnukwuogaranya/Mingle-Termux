                                      src/pages/Login.tsx  
import { useNavigate } from "react-router-dom"; import React, { useState } from "react"; import "./Auth.css";

import { loginUser } from "../services/auth";

export default function Login() {

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);

const [error, setError] = useState("");

const [loading, setLoading] = useState(false); const navigate = useNavigate();

const login = async () => {
setError("");    if (!email || !password) {     setError("Please enter your email and password.");     return;   }     try {      setLoading(true);       await loginUser(       email,       password     );       navigate("/home");     } catch (err: any) {      setError(       err.message ||       "Login failed."     );     } finally {      setLoading(false);    }   
};

^G Help         ^O Write Out    ^F Where Is     ^K Cut
