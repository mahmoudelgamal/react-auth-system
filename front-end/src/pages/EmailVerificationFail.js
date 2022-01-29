import { useHistory } from "react-router-dom";

export const EmailVerificationFail = () => {
  const history = useHistory();
  return (
    <div className="content-container">
      <h1>U oh...</h1>
      <p>Sometung went wrong while you're trying to verify your email.</p>
      <button onClick={() => history.push("/signup")}>Back to Sign Up</button>
    </div>
  );
}