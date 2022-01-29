import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
  path: '/api/users/:userId',
  method: 'put',
  handler: async (req, res) => {
    // console.log({req});
    const {authorization} = req.headers;
    const {userId} = req.params;

    const update = (({
      favoriteFood, 
      hairColor, 
      bio}) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    if(!authorization) {
      return res.status(401).json({message:"No authorization header sent"});
    }
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if(err) return res.status(401).json({message:"unable to validate Token"});
      const {id, isVerified} = decodedToken;
      console.log({id,userId})
      if(id !== userId)  return res.status(403).json({message:"Token does not match user"});
      if(!isVerified) return res.status(403).json({message:"User is not verified"});
      
      const db = getDbConnection('react-auth-db');
      const result = await db.collection('users').findOneAndUpdate(
        {_id: ObjectId(id)}, 
        {$set: {info: update} }, 
        {returnOriginal: false});

        const {email , info} = result.value

        jwt.sign({id,email ,isVerified ,info}, process.env.JWT_SECRET, (err, token) => {
          if(err) return res.status(500).json({message:"unable to sign token"});
          return res.status(200).json({token});
          
        })
    
    });

  }
};