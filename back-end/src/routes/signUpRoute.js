import jwt from 'jsonwebtoken';
import {getDbConnection} from "../db";
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/awsUserPool';

export const signUpRoute = {
  path: '/api/signUp',
  method: 'post',
  handler: async (req, res) => {
      const { email, password} = req.body;

      const attributes = [
          new CognitoUserAttribute({
              Name: 'email',
              Value: email
          })
      ];

      awsUserPool.signUp(email, password, attributes, null, async (err, awsResult) => {
          if (err) {
            console.log({err});
              return res.status(500).json({message: 'Error signing up user'});
          }

          const db = getDbConnection('react-auth-db');
          const startingInfo = {
            hairColor: '',
            favouriteFood: '',
            bio: '',
          };
          const result = await db.collection('users').insertOne({
              email,
              info: startingInfo,
          });
          console.log({result});
          
          const { insertedId } = result;
          jwt.sign({
              id: insertedId,
              email,
              isVerified: false,
              info: startingInfo,
            }, 
            process.env.JWT_SECRET, 
            (err, token) => {
              if (err) return res.status(500).json({message: 'Error signing up user'});
              return res.status(200).json({token});
            }
          );
      });

  }
}