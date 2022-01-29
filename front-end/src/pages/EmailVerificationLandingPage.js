import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";
import { useToken } from "../auth/useToken";


export const EmailVerificationLandingPage = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isSuccess, setIsSuccess ] = useState(false);
  const [ isFail, setIsFail ] = useState(false);
  const { verificationString } = useParams();
  const [ ,setToken ] = useToken();
  console.log("useParams()",useParams());
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.put("/api/verify-email", { verificationString })
        const { token } = response.data;
        setToken(token);
        setIsLoading(false);
        setIsSuccess(true);
      } catch (error) {
        setIsLoading(false);
        setIsFail(true);
      }
        
    }
    verifyEmail();
  }, [verificationString, setToken]);

  if (isLoading) return <div>Loading...</div>
  if (isSuccess) return <EmailVerificationSuccess />
  return <EmailVerificationFail />
  
}
