import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import loginImage from "../../assets/login.png";
import { signInApi } from "../../network/api";
import { Toast } from "../components/common/Toast";

export default function Login() {
  const [formData, setFormData] = useState({});

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signInApi(formData);
    Toast.fire({
      icon: response.error ? "error" : "success",
      title: response.message,
    });
    if (response.error) {
      return;
    } else {
      localStorage.setItem("token", response.token);
      window.location.href = "/";
    }
  };

  return (
    <Container>
      <div className="mt-[100px]">
        <Grid container spacing={3} columns={12} alignItems={"center"}>
          <Grid item xs={12} md={6} className="hidden md:grid">
            <img src={loginImage} alt="logo" />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="md:py-10">
              <h2 className="text-[36px] font-semibold">Welcome Back</h2>
              <p className="text-[18px] font-[500] mb-[24px] md:mb-0">
                We are happy to see you again. Let's get started.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-[24px]">
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-[48px] px-2 rounded-[8px] border border-[#e1e1e1] mt-[8px] text-[14px]"
                  onChange={(e) => handleChange(e, "email")}
                  required
                />
              </div>
              <div className="mb-[24px]">
                <label className="label">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-[48px] px-2 rounded-[8px] border border-[#e1e1e1] mt-[8px] text-[14px]"
                  onChange={(e) => handleChange(e, "password")}
                  required
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="w-full bg-[#3c7fff] hover:bg-indigo-800 px- rounded text-white flex justify-center h-[48px] items-center"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
