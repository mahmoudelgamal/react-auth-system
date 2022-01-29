import { v4 as uuid } from 'uuid';
import {sendEmail} from '../utils/sendEmail';
import { getDbConnection } from '../db';

export const forgotPasswordRoute = {
  path: '/api/forgot-password/:email',
  method: 'put',
  handler: async (req, res) => {
      const { email } = req.params;
      console.log(email);
      const db = getDbConnection('react-auth-db');
      const passwordResetCode = uuid();
      const {result} = await db.collection('users').updateOne(
        {email},
        {$set: {passwordResetCode}},
        );
        console.log(result)
      if (result.nModified > 0) {
          try {
              await sendEmail({
                  from: 'elgamal.mem@gmail.com',
                  to: email,
                  subject: 'Reset your password',
                  text: `Please reset your password by clicking this link: http://localhost:3000/reset-password/${passwordResetCode}`,
              });
          }catch (err) {
              console.log(err);
              res.sendStatus(500);
          }
          res.sendStatus(200);
      } else {
        res.status(404).send({message:'Email not found'});
      }
  },
};