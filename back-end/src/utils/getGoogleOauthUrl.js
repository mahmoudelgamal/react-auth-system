import { oAuthClient } from "./oauthClient";


export const getGoogleOauthUrl = () => {
  const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];
  const url = oAuthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope
  });
  return url;
}