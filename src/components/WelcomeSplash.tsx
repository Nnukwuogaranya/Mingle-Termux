import React, { useEffect } from "react";
import "./WelcomeSplash.css";


type Props = {
  onFinish: () => void;
};


const WelcomeSplash = ({ onFinish }: Props) => {


  useEffect(() => {

    const timer = setTimeout(() => {

      onFinish();

    }, 3500);


    return () => clearTimeout(timer);

  }, [onFinish]);



  return (

    <div className="welcome-splash">


      <div className="welcome-image">

        🤝

      </div>


      <h1>
        Welcome to Mingle
      </h1>


      <p>
        Where People Don't Just Connect...
        <br />
        They Belong.
      </p>


    </div>

  );

};


export default WelcomeSplash;
