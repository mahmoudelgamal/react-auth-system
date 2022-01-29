import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { sendEmail } from '../utils/sendEmail';
import {getDbConnection} from "../db";

export const signUpRoute = {
  path: '/api/signUp',
  method: 'post',
  handler: async (req, res) => {
      const { email, password} = req.body;

      const db = getDbConnection('react-auth-db');
      const user = await db.collection('users').findOne({email});
      if (user) {
        res.sendStatus(409);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationString = uuid();
      const startingInfo = {
        hairColor: '',
        favoriteFood: '',
        bio: '',
      }
      const result = await db.collection('users').insertOne({
        email,
        hashedPassword,
        info: startingInfo,
        isVerified: false,
        verificationString,
      });

      const {reultedId} = result;

      try {
        await sendEmail({
          from: 'elgamal.mem@gmail.com',
          to: email,
          subject: 'Verify your email',
          text: `Please verify your email by clicking this link: http://localhost:3000/verify-email/${verificationString}`,
        });
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }

      jwt.sign({
        id: reultedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2d',
      },
      (err, token) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send({token});
      }
      )
      

  },
};