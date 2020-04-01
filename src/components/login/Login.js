import React from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../utilities/axiosWithAuth";
import { useForm } from "react-hook-form";
import Layout from "antd/es/layout";
import "antd/es/layout/style/css";
import Breadcrumb from "antd/es/breadcrumb";
import "antd/es/breadcrumb/style/css";
import Button from "antd/es/button";
import "antd/es/button/style/css";
import '../../index.css';


const { Content } = Layout;

const Login = props => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    axiosWithAuth()
      .post("/api/auth/login", values)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        props.setIsAuthenticated(true);
        props.history.push(`/dashboard/${res.data.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <Layout className="layout">
      <Content className="home-desktop-content" style={{ padding: "0 20px" }}>
        <Breadcrumb style={{ margin: "24px 0" }}></Breadcrumb>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1>Log in</h1>
          <form
            style={{ width: "20%" }}
            onSubmit={handleSubmit(onSubmit)}
            className="signup-form"
          >
            <input
              placeholder="Username"
              name="username"
              ref={register({ required: true })}
            />
            {errors.username && <p>Username is required</p>}
            <input
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" && (
              <p>Password is required</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p>Minimun length is 8 characters</p>
            )}
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Login
            </Button>
            Or <Link to="/signup">Need an account?</Link>
          </form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
