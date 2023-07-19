"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailForgotPasswordTemplate = exports.emailVerificationTemplate = void 0;
const variables_1 = require("./data/variables");
const emailVerificationTemplate = (email, registerToken) => {
    const emailMessage = {
        to: email,
        from: 'PawtnerAdoption@gmail.com',
        subject: 'Pawtner - verify your email',
        text: `Hello,thanks for registering on our site.Please copy and paste the address below to verify your account.${variables_1.WEBSITE_URL}/user/register?token=${registerToken}`,
        html: `<h2>,Pawtner</h2> <p>thanks for registering on our site.</p> <p>  Please click the link below to verify your account.</p> <a href='${variables_1.SERVER_URL}/user/register?token=${registerToken}'>Verify your account</a>,`,
    };
    return emailMessage;
};
exports.emailVerificationTemplate = emailVerificationTemplate;
const emailForgotPasswordTemplate = (email, registerToken) => {
    const emailMessage = {
        to: email,
        from: 'PawtnerAdoption@gmail.com',
        subject: 'Pawtner - Forgot password',
        text: `Hello, To reset your password, click the button below: ${variables_1.WEBSITE_URL}/forgotPassword?token=${registerToken}`,
        html: `<h2>,Pawtner</h2>  <p>  To reset your password, click the button below.</p> <a href='${variables_1.WEBSITE_URL}/forgotPassword?token=${registerToken}'>Forgot password</a><p>Please remember to never share your password with anyone, and to always use a unique, strong password for each account.</p>,`,
    };
    return emailMessage;
};
exports.emailForgotPasswordTemplate = emailForgotPasswordTemplate;
//# sourceMappingURL=sendGridTemplate.js.map