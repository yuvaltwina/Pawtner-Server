import { SERVER_URL, WEBSITE_URL } from './data/variables';

export const emailVerificationTemplate = (
  email: string,
  registerToken: string
) => {
  const emailMessage = {
    to: email,
    from: 'PawtnerAdoption@gmail.com',
    subject: 'Pawtner - verify your email',
    text: `Hello,thanks for registering on our site.Please copy and paste the address below to verify your account.${WEBSITE_URL}/user/register?token=${registerToken}`,
    html: `<h2>,Pawtner</h2> <p>thanks for registering on our site.</p> <p>  Please click the link below to verify your account.</p> <a href='${SERVER_URL}/user/register?token=${registerToken}'>Verify your account</a>,`,
  };
  return emailMessage;
};
export const emailForgotPasswordTemplate = (
  email: string,
  registerToken: string
) => {
  const emailMessage = {
    to: email,
    from: 'PawtnerAdoption@gmail.com',
    subject: 'Pawtner - Forgot password',
    text: `Hello, To reset your password, click the button below: ${WEBSITE_URL}/forgotPassword?token=${registerToken}`,
    html: `<h2>,Pawtner</h2>  <p>  To reset your password, click the button below.</p> <a href='${WEBSITE_URL}/forgotPassword?token=${registerToken}'>Forgot password</a><p>Please remember to never share your password with anyone, and to always use a unique, strong password for each account.</p>,`,
  };
  return emailMessage;
};
