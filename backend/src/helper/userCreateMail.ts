import { transport } from './mailTransporter';

export const userCreatedMail = async (email: string, username: string, password: string) => {
    console.log(email, username, password)
    const mail = {
        from: {
            name: "Payal Dealers Pvt Ltd",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "Dashboard User Credential of PAYAL Dealers Pvt. Ltd",
        text: `Your username : ${username} has been created.`,
        html: `<h4>Hi User,</h4>,<br/><br/>
       <h4> New User with Username :<b>${username}</b> and Password : <b>${password}</b> has been created to access Organization Dashboard.</h4><br/><br/>
                <b>Website :</b><a href="${process.env.DOMAIN}">Click Here</a>`,

    }
    return await transport.sendMail(mail)
}

export const userModifiedMail = async (email: string, username: string, password: string) => {
    console.log(email, username, password)
    const mail = {
        from: {
            name: "Payal Dealers Pvt Ltd",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "Dashboard User Credential of PAYAL Dealers Pvt. Ltd",
        text: `Your username : ${username} has been created.`,
        html: `<h4>Hi User,</h4><br/><br/>
    <h4> New Username :<b>${username}</b> and New Password : <b>${password}</b> is now set to access Organization Dashboard as per modification.</h4><br/><br/>
                <b>Website :</b><a href="${process.env.DOMAIN}">Click Here</a>`,

    }
    return await transport.sendMail(mail)
}

export const userNameModifiedMail = async (email: string, Nusername: string, OuserName: string) => {
    console.log(email, Nusername, OuserName)
    const mail = {
        from: {
            name: "Payal Dealers Pvt Ltd",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "Dashboard User Credential of PAYAL Dealers Pvt. Ltd",
        text: `Hi username : ${OuserName} Your username Has been Updated.`,
        html: `<h4>Hi User,</h4><br/><br/>
       <h4>Your Old Username :${OuserName} is now updated to New User Name : <b>${Nusername}</b> for accessing Organization Dashboard.</h4><br/><br/>
                <b>Website :</b><a href="${process.env.DOMAIN}">Click Here</a>`,

    }
    return await transport.sendMail(mail)
}

export const userPasswordModifiedMail = async (email: string, password: string) => {
    console.log(email, password)
    const mail = {
        from: {
            name: "Payal Dealers Pvt Ltd",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "Dashboard User Credential of PAYAL Dealers Pvt. Ltd",
        text: `Your username Acount has been Updated.`,
        html: `<h4>Hi User,</h4>,<br/><br/>
       <h4> Your old Password is now updated to new Password: <b>${password}</b> for accessing Organization Dashboard.</h4><br/><br/>
                <b>Website :</b><a href="${process.env.DOMAIN}">Click Here</a>`,

    }
    return await transport.sendMail(mail)
}

export const ResetPassword = async (email: string, id: string) => {
    console.log(email, id)
    const mail = {
        from: {
            name: "Payal Dealers Pvt Ltd",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "Reset Password",
        text: `Your password has been reset.`,
        html: `<h4>Hi User,</h4>,<br/><br/>
       <h4> Your Password Change Request is Received. Please use the below Verification Code to reset your password.</h4><br/><br/>
                <h4> Verification Code  : <b>${id}</b></h4><br/><br/>
                <h3>Type the Verification Code in the Verification Code Field and Reset your Password</h3><br/><br/>
                <b>Website :</b><a href="${process.env.RESET_PASSWORD_URL}">Click Here</a>`,
    }
    return await transport.sendMail(mail)
}