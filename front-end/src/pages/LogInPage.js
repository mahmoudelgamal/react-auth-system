import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";
import { useQueryParams } from "../util/useQueryParams";

export const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ googleOauthUrl, setGoogleOauthUrl ] = useState("");
  const history = useHistory();
  const [, setToken] = useToken();
  const { token: oauthToken } = useQueryParams();


  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      history.push("/");
    }
  }, [oauthToken,history,setToken]);
  useEffect(() => {
    const getGoogleOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;  
        setGoogleOauthUrl(url);
      } catch(err) {
        console.log(err);
      }
    }
    getGoogleOauthUrl();
  }, []);
  const onLogClicked = async () => {
    const response = await axios.post("/api/logIn", {
      email,
      password,
    });
    setToken(response.data.token);
    history.push("/");
  };
  return (
    <div className="content-container">
      <h1>Log In</h1>
      {error && <p className="fail">{error}</p>}
        <input 
          type="email" 
          placeholder="someone@gmail.com" 
          id="username" 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="password" 
          id="username"
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        <hr/>
        <button
          onClick={onLogClicked}
          disabled={!email || !password}
        >
          Log In
          </button>
        <button
          onClick={() => history.push("/forgot-password")}
        >
          Forgot your password?
        </button>
        <button
          onClick={() => history.push("/signup")}
        >
          Don't have account? Sign up
        </button>

        <button
          disabled={!googleOauthUrl}
          onClick={() => window.location.href = googleOauthUrl}
        >
          Log In with Google
        </button>

    </div>
  );
}