import { useState } from "react";
import axios from "axios";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFail } from "./PasswordResetFail";
import { useQueryParams } from "../util/useQueryParams";

export const ResetPasswordLandingPage = () => {
  const [ success, setSuccess ] = useState(null);
  const [fail, setFail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ passwordResetCode, setPasswordResetCode ] = useState("");
  const { email } = useQueryParams();

  const onResetPasswordClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {email,newPassword: password});
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
      <input 
        placeholder="password reset code" 
        type="password" 
        value={passwordResetCode} onChange={(e) => setPasswordResetCode(e.target.value)} 
      />
      <input 
        placeholder="password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <input 
        placeholder="Confirm password" 
        type="password" 
        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
      />
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