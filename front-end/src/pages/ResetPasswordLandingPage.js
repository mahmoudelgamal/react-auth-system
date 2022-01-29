import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFail } from "./PasswordResetFail";

export const ResetPasswordLandingPage = () => {
  const [ success, setSuccess ] = useState(null);
  const [fail, setFail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { PasswordResetCode } = useParams();
  console.log("useParams()",useParams());

  const onResetPasswordClicked = async () => {
    console.log("PasswordResetCode", PasswordResetCode);
    try {
      await axios.put(`/api/users/${PasswordResetCode}/reset-password`, {newPassword: password});
      setSuccess(true);
    } catch (error) {
      setFail(true);
    }
  }

  if(fail) return <PasswordResetFail/>
  if(success) return <PasswordResetSuccess/>
  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Enter your new password</p>
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <hr/>
      <button
        onClick={onResetPasswordClicked}
        disabled={!password || !confirmPassword || password !== confirmPassword}
      >
        Reset Password
      </button>
    </div>
  );
};