import { useHistory } from "react-router-dom";

export const PasswordResetFail = () => {
  const history = useHistory();
  return (
    <div className="content-container">
      <h1>U oh...</h1>
      <p>Sometung went wrong while you're trying to reset your password.</p>
      <button onClick={() => history.push("/")}>Back to Sign Up</button>
    </div>
  );
}