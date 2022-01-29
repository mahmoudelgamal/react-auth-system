import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({from, to, subject, text,html}) => {
    const msg = {from, to, subject, text,html};
    await sendGrid.send(msg);
}