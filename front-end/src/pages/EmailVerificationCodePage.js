import { useState } from "react";
import axios from "axios";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams"


export const EmailVerificationCodePage = () => {
  const [ isSuccess, setIsSuccess ] = useState(false);
  const [ isFail, setIsFail ] = useState(false);
  const [ verificationString, setVerificationString ] = useState("");
  const [ ,setToken ] = useToken();
  const { email } = useQueryParams();
  
  const onSubmitVerificationString = async () => {
    try {
      const response = await axios.put("/api/verify-email", { verificationString, email })
      const { token } = response.data;
      setToken(token);
      setIsSuccess(true);
    } catch (error) {
      setIsFail(true);
    }
  }

  if (isFail) return <EmailVerificationFail/>
  if (isSuccess) return <EmailVerificationSuccess />
  return (
    <div className="content-container">
      <h1>Please verify Your Email!</h1>
      <p>
        You should have recieved a verification code to your email address.
      </p>
      <input placeholder="e.g 12345" value={verificationString} onChange={e => setVerificationString(e.target.value)} />
      <button onClick={onSubmitVerificationString}>Submit</button>
    </div>      
  )
  
}
