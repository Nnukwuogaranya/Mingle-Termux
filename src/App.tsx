import React, { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";


function App() {

  const [page, setPage] = useState("login");

  const [loggedIn, setLoggedIn] = useState(false);



  if (loggedIn) {
    return <Home />;
  }



  if (page === "register") {

    return (

      <Register
        onRegister={() => setPage("login")}
      />

    );

  }



  if (page === "forgot") {

    return (

      <ForgotPassword />

    );

  }



  return (

    <Login

      onLogin={() => setLoggedIn(true)}

      onRegister={() => setPage("register")}

      onForgotPassword={() => setPage("forgot")}

    />

  );

}


export default App;
