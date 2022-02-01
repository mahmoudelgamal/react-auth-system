import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const SignUpPage = () => {
  const [ token, setToken ] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const onSignUpClicked = async () => {
    const response = await axios.post("/api/signUp", {
      email,
      password,
    });
      setToken(response.data.token);
      history.push(`/please-verify?email=${encodeURIComponent(email)}`);
  };
  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {error && <p className="fail">{error}</p>}
        <input 
          type="email" 
          placeholder="someone@gmail.com" 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="password" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Confirm password" 
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} 
        />
        <hr/>
        <button
          onClick={onSignUpClicked}
          disabled={!email || !password || password !== confirmPassword}
        >
          Sign Up
          </button>
        <button
          onClick={() => history.push("/login")}
        >
          Already have an account? Log in
        </button>
    </div>
  );
}