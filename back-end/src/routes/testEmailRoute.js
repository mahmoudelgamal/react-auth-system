import { sendEmail } from "../utils/sendEmail";

export const testEmailRoute = {
  path: '/api/test-email',
  method: 'post',
  handler: async(req, res) => {
    try {
      await sendEmail({
        from: 'elgamal.mem@gmail.com',
        to: 'elgamal.mem+test2@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email from the test route',
        html: '<h1>We all love you.</h1>'
      });
      res.status(200).send('Email sent');
      
    }catch(err) {
      res.sendStatus(500);
    } 
  },
};