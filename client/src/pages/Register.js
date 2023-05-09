import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import doctorImage from "../assets/doctor1.jpg";
import logo from "../assets/logo.png";
import InputBar from "../components/InputBar";
import AuthFormLayout from "../components/AuthFormLayout";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrationHandler = async (e) => {
    e.preventDefault();
    const data = e.target;
    const values = {
      name: data.name.value,
      email: data.email.value,
      password: data.password.value,
    };
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      if (res.data.success) {
        dispatch(hideLoading());
        message.success("Registration successful");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      e.preventDefault();
      alert("something went wrong");
      // console.error(error);
      dispatch(hideLoading());
    }
  };
  return (
    <AuthFormLayout>
      <form className="form_container" onSubmit={registrationHandler}>
        <div className="heading">
          <h2>Get Started</h2>
          <h6>Already have an account? </h6>
          <Link to={"/login"} className="toggle">
            Login in
          </Link>
        </div>

        <div className="actual-form">
          <InputBar
            label={"Name"}
            name={"name"}
            type={"text"}
            required={true}
          />
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

          <input type="submit" value="Sign Up" className="sign-btn" />

          <p className="text">
            By signing up, I agree to the{" "}
            <Link href="#" style={{ color: "ActiveCaption" }}>
              Terms of Services
            </Link>{" "}
            and{" "}
            <Link href="#" style={{ color: "ActiveCaption" }}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </AuthFormLayout>
  );
};

export default Register;
