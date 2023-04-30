export const emailVerificationTemplate = (
  email: string,
  registerToken: string
) => {
  const emailMessage = {
    to: email,
    from: "PawtnerAdoption@gmail.com",
    subject: "Pawtner - verify your email",
    //לשנות את כתובת האתר לאתר האמיתי חשוב!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    text: `Hello,thanks for registering on our site.Please copy and paste the address below to verify your account.http://localhost:3000/user/register?token=${registerToken}`,
    html: `<h2>pawtner,</h2> <p>thanks for registering on our site.</p> <p>  Please click the link below to verify your account.</p> <a href='http://localhost:3000/user/register?token=${registerToken}'>Verify your account</a>,`,
  };
  return emailMessage;
};
export const emailForgotPasswordTemplate = (
  email: string,
  registerToken: string
) => {
  const emailMessage = {
    to: email,
    from: "PawtnerAdoption@gmail.com",
    subject: "Pawtner - Forgot password",
    //לשנות את כתובת האתר לאתר האמיתי חשוב!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    text: `Hello,thanks for registering on our site.Please copy and paste the address below to verify your account.http://localhost:3000/user/register?token=${registerToken}`,
    html: `<h2>pawtner,</h2> <p>thanks for registering on our site.</p> <p>  Please click the link below to verify your account.</p> <a href='http://localhost:3000/user/register?token=${registerToken}'>Verify your account</a>,`,
  };
  return emailMessage;
};
