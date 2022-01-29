import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
  const [token] = useToken();
  
  const getPayLoadFromToken = (token) => {
    const encodedToken = token.split(".")[1];
    const decodedToken = JSON.parse(window.atob(encodedToken));
    console.log({ decodedToken });
    return decodedToken;
  }

  const [user, setUser] = useState(() => {
    if(!token) return null;
    return getPayLoadFromToken(token);
  });


  useEffect(() => {
    if(!token) {
      setUser(null);
    } else {
      const user = getPayLoadFromToken(token);
      setUser(user);
    }
  }, [token]);

  return user;
}