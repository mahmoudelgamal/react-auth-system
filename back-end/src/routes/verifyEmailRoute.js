import  Jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../utils/awsUserPool";

export const verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'put',
  handler: async (req, res) => {
      const { verificationString,email } = req.body;

      new CognitoUser({
          Username: email,
          Pool: awsUserPool
      }).confirmRegistration(verificationString, true, async (err) => {
          if (err) {
              console.log({err});
              return res.status(401).json({message: 'the email verifivation code is not correct!'});
          }
          const db = getDbConnection('react-auth-db');
          const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { isVerified: true } },
            { returnOriginal: false }
          );

          console.log({result});
          const { _id:id, info } = result.value;
            
          Jwt.sign(
            { id, email, info, isVerified: true }, 
            process.env.JWT_SECRET, 
            { expiresIn: "2d" }, 
            (err, token) =>{
              if (err) res.sendStatus(500);
              return res.status(200).json({ token });
            }
          );

      });

  },
};