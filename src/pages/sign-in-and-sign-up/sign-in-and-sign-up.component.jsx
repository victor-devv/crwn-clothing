import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";

import "./sign-in-and-sign-up.styles.scss";

//INSTEAD OF USING A STATEFUL CALSS COMPONENT, WE WILL USE A FUNCTIONAL COMPONENT BECAUSE WE'RE GONNA KEEP ALL OF THAT ON OUR SISGN IN AND SIGN UP COMPONENTS RESPECTIVELY

const SignInAndSignUpPage = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
  </div>
);

export default SignInAndSignUpPage;
