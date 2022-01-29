import axios from "axios";
import { oAuthClient } from "./oauthClient";

const getAccessAndBearerTokenUrl = ({accessToken}) => {
  console.log({accessToken});
  return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
};

export const getGoogleUser = async ({code}) => {
  // console.log("code", code);
  try {
    const {tokens} = await oAuthClient.getToken(code);
    console.log("tokens", tokens);
    const response = await axios.get(getAccessAndBearerTokenUrl({accessToken:tokens.access_token}), 
    {headers: {Authorization: `Bearer ${tokens.id_token}`}});
    console.log({response});
    return response.data;
  } catch(err) {
    console.log({err});
  }
};