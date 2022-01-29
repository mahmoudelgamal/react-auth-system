import { getDbConnection } from "../db";
import bcrypt from "bcrypt";

export const resetPasswordRoute = {
  path: '/api/users/:passwordResetCode/reset-password',
  method: 'put',
  handler: async (req, res) => {
      const { passwordResetCode } = req.params;
      console.log(passwordResetCode);
      const { newPassword } = req.body;
      console.log({newPassword});
      const db = getDbConnection('react-auth-db');
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      console.log({newPasswordHash});
      const result = await db.collection('users').findOneAndUpdate(
        { passwordResetCode },
        { $set: { hashedPassword: newPasswordHash },
          $unset: { passwordResetCode: '' } 
        },
      );
      console.log({result});
      if (result.lastErrorObject.n == 0) return  res.sendStatus(404);
      res.sendStatus(200);

  },
};