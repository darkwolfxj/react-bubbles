import React from "react";

import useForm from "./../custom hooks/useForm";
import axios from "axios";

const Login = ({ history }) => {
    const [username, handleUsername] = useForm("")
    const [password, handlePassword] = useForm("")
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ username, password })
        axios
            .post("http://localhost:5000/api/login", { username, password })
            .then(res => localStorage.setItem("token", res.data.payload))
            .catch(err => console.log(err))
        setTimeout(() => history.push("/bubbles"), 2000)
    }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={ handleSubmit }>
          <input onChange={ (e) => handleUsername(e.target.value) } type="text" placeholder="username" value={ username } name="username"/>
          <input onChange={ (e) => handlePassword(e.target.value) } type="password" placeholder="password" value={ password } name="password" />
          <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
