import  Jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'put',
  handler: async (req, res) => {
      const { verificationString } = req.body;
      const db = getDbConnection('react-auth-db');
      const result = await db.collection('users').findOne(
        { verificationString },
      );
      if (!result) {
        res.status(401).json({ message: "Invalid verification string" });
      }
      const { _id:id, email, info } = result;

      Jwt.sign({ id, email, info, isVerified: true }, process.env.JWT_SECRET, 
        { expiresIn: "2d" }, (err, token) =>{
          if (err) res.sendStatus(500);
          return res.status(200).json({ token });
        }
      );


  },
};