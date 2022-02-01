import { CognitoUser } from "amazon-cognito-identity-js";
import { awsUserPool } from "../utils/awsUserPool";

export const forgotPasswordRoute = {
  path: '/api/forgot-password/:email',
  method: 'put',
  handler: async (req, res) => {
      const { email } = req.params;
      console.log(email);

      const user = new CognitoUser({
        Username: email,
        Pool: awsUserPool,
      }).forgotPassword({
        onSuccess: () => {
          res.sendStatus(200);
        },
        onFailure: (err) => {
          console.log(err);
          res.sendStatus(500);
        },
      });

  },
};