import { useHistory } from "react-router-dom";

export const EmailVerificationSuccess = () => {
  const history = useHistory();
  return (
    <div className="content-container">
      <h1>Success!!</h1>
      <p>Thanks for verifing your email. Now you can use all app's feature</p>
      <button onClick={() => history.push("/")}>Go Home</button>
    </div>
  );
}