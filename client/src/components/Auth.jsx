import React from "react";
import { useCookies } from "react-cookie"

function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [isLogIn, setIsLogIn] = React.useState(true);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [error, setError] = React.useState();

  console.log(cookies)

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords not match");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie("Email", data.email)
      setCookie("AuthToken", data.token)

      window.location.reload()
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <form>
          <h2>{isLogIn ? "Please log in" : "Please sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="password" 
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && <input 
            type="password" 
            placeholder="confirm password" 
            onChange={(e) => setConfirmPassword(e.target.value)}
            />}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>

        <div className="auth__options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogIn
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogIn
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
