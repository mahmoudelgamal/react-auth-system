import { useState } from "react";

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    const token = localStorage.getItem("token");
    return token;
  });

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenInternal(newToken);
  };
  return [token, setToken];
}




// export const useToken = () => {
//   const [token, setToken] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const setTokenFromStorage = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setToken(token);
//       setIsLoggedIn(true);
//     }
//   };

//   const setTokenToStorage = (token) => {
//     localStorage.setItem("token", token);
//     setToken(token);
//     setIsLoggedIn(true);
//   };

//   const removeTokenFromStorage = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setIsLoggedIn(false);
//   };

//   return {
//     token,
//     setTokenToStorage,
//     removeTokenFromStorage,
//     isLoggedIn,
//   };
// }