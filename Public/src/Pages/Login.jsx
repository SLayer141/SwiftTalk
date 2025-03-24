import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Chat from "../assets/chat.svg";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate=useNavigate()
  const [value, setvalue] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        console.log("Login user...", loginRoute);
        const { username, password } = value;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
  
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
          return;
        }
  
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/chat");
        }
      } catch (error) {
        console.error("Registration error:", error.response?.data?.msg || error.message);
        toast.error(error.response?.data?.msg || "Something went wrong", toastOptions);
      }
    }
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const handleValidation = () => {
    const { password, username} = value;
    if (password==="") {
      {
        toast.error("Username and password is required", toastOptions);
        return false;
      }
    } else if (username==="") {
      toast.error("Username and password is required", toastOptions);
      return false;
    } 
    return true;
  };

  const handleChange = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={Chat} alt="chat" />
          <h1>SwiftTalk</h1>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          min="3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <span>
        Don't have an one ? <Link to="/register">register</Link>
        </span>
      </form>
      <ToastContainer />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;

      &:hover {
        background-color: #4e0eff;
      }
    }

    span {
      color: white;
      text-transform: uppercase;

      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
