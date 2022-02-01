import jwt from 'jsonwebtoken';
import { 
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
 } from 'amazon-cognito-identity-js';
 import { awsUserPool } from '../utils/awsUserPool';
import {getDbConnection} from "../db";
export const logInRoute = {
  path: '/api/logIn',
  method: 'post',
  handler: async (req, res) => {
      const { email, password} = req.body;

      new CognitoUser({
        Username: email,
        Pool: awsUserPool,
      }).authenticateUser(new AuthenticationDetails({
        Username: email,
        Password: password,
      }), {
        onSuccess: async (result) => {
          const db = getDbConnection('react-auth-db');
          const user = await db.collection('users').findOne({email});

          const {_id:id, isVerified, info} = user;
          jwt.sign({
            id,
            email,
            info,
            isVerified,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '2d',
          },
          (err, token) => {
            if (err) {
              res.sendStatus(500)
            }
            res.status(200).send({token});
          }
          )
  
        },
        onFailure: (err) => {
          res.sendStatus(401);
        },
      }
      );

      

  },
};