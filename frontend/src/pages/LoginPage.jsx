// LoginPage.jsx
import "../styles/LoginPage.css";
import { useState } from "react";
import LoginBanner from "../layouts/LoginBanner";
import LoginForm from "../layouts/LoginForm";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../action/auth";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login({
        email,
        password,
      });

      if (res.data) {
        //save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        //save user and token to redux

        dispatch({
          type: "LOGGED_IN",
          payload: res.data,
        });
        navigate("/dashboard");
      }
      toast.success("Login Successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <LoginBanner />
        <LoginForm
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};

export default LoginPage;
