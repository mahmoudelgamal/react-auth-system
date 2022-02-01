import { CognitoUser } from 'amazon-cognito-identity-js';
import { awsUserPool } from '../utils/awsUserPool';

export const resetPasswordRoute = {
  path: '/api/users/:passwordResetCode/reset-password',
  method: 'put',
  handler: async (req, res) => {
      const { passwordResetCode } = req.params;
      const { email,newPassword } = req.body;
      console.log({email,newPassword});
      console.log({passwordResetCode});
    
      new CognitoUser({Username: email, Pool: awsUserPool})
      .confirmPassword(passwordResetCode, newPassword,{
        onSuccess: ()=>{
          res.sendStatus(200)
        },
        onFailure: (err)=>{
          console.log({err});
          res.sendStatus(401)
        }
      })
  },
};