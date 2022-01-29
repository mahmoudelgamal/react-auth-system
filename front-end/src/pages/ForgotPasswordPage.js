import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const ForgotPasswordPage = () => {
  const [ emailValue, setEmailValue ] = useState("");
  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState(false);
  const history = useHistory();

  const onsubmitClicked = async () => {
    try {
      await axios.put(`/api/forgot-password/${emailValue}`)
      setSuccess(true);
      setTimeout(() => {
        history.push("/login");
      },3000)
    }catch(e){
      console.log({e});
      if(e.response.data.message) return setError(e.response.data.message);
      setError(e.message);
    }
  }
  return success? (
    <div className="content-container">
      <h1>Success!</h1>
      <p>Check your email for a link to reset your password.</p>
    </div>
  ) : (
    <div className="content-container">
      <h1>Forgot Password</h1>
      <p>Enter your email address to reset your password.</p>
      {error && <p>{error}</p>}
      <input placeholder="someone@gmail.com" type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
      <button onClick={onsubmitClicked}>Get reset password Link</button>
    </div>
  );

}