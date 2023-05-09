import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import doctorImage from "../assets/doctor1.jpg";
import logo from "../assets/logo.png";
import InputBar from "../components/InputBar";
import AuthFormLayout from "../components/AuthFormLayout";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = e.target;
    const values = {
      email: data.email.value,
      password: data.password.value,
    };

    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      if (res.data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", res.data.token);
        message.success("Login Succesfull");
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      e.preventDefault();
      alert("something went wrong");
      // console.error(error);
      dispatch(hideLoading());
    }
  };
  return (
    <>
      {/* <div classNameName="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          classNameName="register-form"
        >
          <h3 classNameName="text-center">Login Form</h3>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" classNameName="margin=2">
            NOT A USER! REGISTER HERE
          </Link>
          <button classNameName="btn btn-primary" type="submit">
            LOG IN
          </button>
        </Form>
      </div> */}
      <AuthFormLayout>
        <form className="form_container" onSubmit={loginHandler}>
          <div className="heading">
            <h2>Welcome Back</h2>
            <h6>Not registred yet? </h6>
            <Link to={"/register"} className="toggle">
              Sign up
            </Link>
          </div>

          <div className="actual-form">
            <InputBar
              label={"Email"}
              name={"email"}
              type={"email"}
              required={true}
            />
            <InputBar
              label={"Password"}
              name={"password"}
              type={"password"}
              required={true}
            />

            <input type="submit" value="Sign In" className="sign-btn" />

            <p className="text">
              Forgotten your password or you login datails?
              <Link href="#" style={{ color: "ActiveCaption" }}>
                Get help
              </Link>{" "}
              signing in
            </p>
          </div>
        </form>
      </AuthFormLayout>
    </>
  );
};

export default Login;
