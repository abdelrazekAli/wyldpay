import nodemailer from "nodemailer";

export const sendRegisterEmail = (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const mailOptions = {
    from: "Wyld",
    to: email,
    subject: "Wyld register magic link",
    html: `<div style="margin: 0px auto; max-width: 600px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0 20px; text-align: center; border-collapse: collapse;">
        <div style="margin: 0px auto; max-width: 560px;">&nbsp;</div>
        <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 560px;">
        <table style="background: #ffffff; width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 70px 0 52px; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word;" align="center">
        <table style="border-collapse: collapse; border-spacing: 0;" role="presentation" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="width: 167px; border-collapse: collapse;"><img style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px; line-height: 100%;" title="WYLD" src="https://wyldpay.herokuapp.com/assets/images/logo-blue.png" alt="WYLD logo" width="167" height="auto" data-bit="iit"></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="margin: 0 auto; max-width: 560px; background-color: #ffffff; padding-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word;" align="center">
        <div style="font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 24px; font-weight: bold; line-height: 30px; text-align: center; color: #192033;">Register to WYLd</div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="margin: 0 auto; max-width: 560px; background-color: #ffffff; padding-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0 0 24px; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word;" align="center">
        <div style="font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 14px; font-weight: 400; line-height: 140%; text-align: center; color: #192033;">Click the button below to redirect you to the signup steps.</div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="margin: 0 auto; max-width: 560px; background-color: #ffffff; padding-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; padding-bottom: 20px; word-break: break-word;" align="center">
        <table style="border-collapse: collapse; width: 210px; line-height: 100%;" role="presentation" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="border: none; border-radius: 10px; background: #4479FB; border-collapse: collapse;" role="presentation" align="center" valign="middle" bgcolor="#4479FB"><a href='${process.env.BASE_URL}/admin/signup/${token}' style="display: inline-block; cursor: pointer; width: 174px; background: #4479FB; color: #ffffff; font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 13px; font-weight: normal; line-height: 120%; margin: 0; text-decoration: none; text-transform: none; padding: 18px; border-radius: 10px;">Sign up</a></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="margin: 0 auto; max-width: 560px; background-color: #ffffff; padding-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse; height: 89.1762px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr style="height: 10px;">
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word; height: 10px;" align="left">nn</td>
        </tr>
        <tr style="height: 20px;">
        <td style="font-size: 0px; border-collapse: collapse; word-break: break-word; height: 20px;">
        <div style="height: 20px; line-height: 20px;"> </div>
        </td>
        </tr>
        <tr style="height: 19.5881px;">
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word; height: 19.5881px;" align="left">
        <div style="font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 14px; font-weight: 400; line-height: 140%; text-align: left; color: #192033;">Thanks,</div>
        </td>
        </tr>
        <tr style="height: 19.5881px;">
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word; height: 19.5881px;" align="left">
        <div style="font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 14px; font-weight: 400; line-height: 140%; text-align: left; color: #192033;">WYLD Team</div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw error.message;
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
export const sendResetPassEmail = (
  userId: string,
  email: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Wyld",
    to: email,
    subject: "Wyld Reset Password link",
    html: `<div style="margin: 0px auto; max-width: 600px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0 20px; text-align: center; border-collapse: collapse;">
        <div style="margin: 0px auto; max-width: 560px;">&nbsp;</div>
        <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 560px;">
        <table style="background: #ffffff; width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 70px 0 52px; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word;" align="center">
        <table style="border-collapse: collapse; border-spacing: 0;" role="presentation" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="width: 167px; border-collapse: collapse;"><img style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px; line-height: 100%;" title="WYLD" src="https://wyldpay.herokuapp.com/assets/images/logo-blue.png" alt="WYLD logo" width="167" height="auto" data-bit="iit"></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="margin: 0 auto; max-width: 560px; background-color: #ffffff; padding-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word;" align="center">
        <div style="font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 24px; font-weight: bold; line-height: 30px; text-align: center; color: #192033;">Reset Password</div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="margin: 0 auto; max-width: 560px; background-color: #ffffff; padding-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0 0 24px; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word;" align="center">
        <div style="font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 14px; font-weight: 400; line-height: 140%; text-align: center; color: #192033;">Click the button below to redirect you to the reset password page.</div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="margin: 0 auto; max-width: 560px; background-color: #ffffff; padding-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; padding-bottom: 20px; word-break: break-word;" align="center">
        <table style="border-collapse: collapse; width: 210px; line-height: 100%;" role="presentation" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
        <td style="border: none; border-radius: 10px; background: #4479FB; border-collapse: collapse;" role="presentation" align="center" valign="middle" bgcolor="#4479FB"><a href='${process.env.BASE_URL}/admin/reset-pass/${userId}/${token}' style="display: inline-block; cursor: pointer; width: 174px; background: #4479FB; color: #ffffff; font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 13px; font-weight: normal; line-height: 120%; margin: 0; text-decoration: none; text-transform: none; padding: 18px; border-radius: 10px;">Reset</a></td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div style="margin: 0 auto; max-width: 560px; background-color: #ffffff; padding-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;" role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="direction: ltr; font-size: 0; padding: 0; text-align: center; border-collapse: collapse;">
        <div style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
        <table style="vertical-align: top; border-collapse: collapse; height: 89.1762px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
        <tr style="height: 10px;">
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word; height: 10px;" align="left">nn</td>
        </tr>
        <tr style="height: 20px;">
        <td style="font-size: 0px; border-collapse: collapse; word-break: break-word; height: 20px;">
        <div style="height: 20px; line-height: 20px;"> </div>
        </td>
        </tr>
        <tr style="height: 19.5881px;">
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word; height: 19.5881px;" align="left">
        <div style="font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 14px; font-weight: 400; line-height: 140%; text-align: left; color: #192033;">Thanks,</div>
        </td>
        </tr>
        <tr style="height: 19.5881px;">
        <td style="font-size: 0px; padding: 0px; border-collapse: collapse; word-break: break-word; height: 19.5881px;" align="left">
        <div style="font-family: 'Euclid Circular A',helvetica,sans-serif; font-size: 14px; font-weight: 400; line-height: 140%; text-align: left; color: #192033;">WYLD Team</div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </div>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
