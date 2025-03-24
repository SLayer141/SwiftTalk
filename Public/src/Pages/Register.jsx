import React from "react";
import styled from "styled-components";
import Chat from "../assets/chat.svg";
import { Link } from "react-router-dom";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("form");
  };

  const handleChange = (e) => {};

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Chat} alt="chat" />
            <h1>name here</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
          />
          <button type="submit">Create user</button>
          <span>
            Already have an account? <Link to="/login">login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100wh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-item: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-item: center;
    gap: 1rem;
    justify-content: center;
    img {
    height:5rem;    
    }
    h1{
    color:white;
    text-transform:uppercase;
    }
  }
    form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding 3rem 5rem;
    input{
    background-color:transparent;
    padding:1rem;
    border:0.1rem solid #4e0eff;
    border-radius:0.4rem;
    color:white;
    width:100%;
    font-size:1rem;
    &:focus{
    border:.0.1rem solid #997af0;
    }
    }
    button{
    background-color:#997af0;
    color:white;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    text-transform:uppercase;
    transition:0.5s ease-in-out;
    &:hover{
    background-color: #4e0eff;
    }
    }
    span{
    color:white;
    text-transform:uppercase;
    a{
    color:#4e0eff;
    text-decoration:none;
    font-weight:bold;
    }
    }
    }
`;

export default Register;
