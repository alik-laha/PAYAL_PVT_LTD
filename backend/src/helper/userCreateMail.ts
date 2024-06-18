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
        html: `<h3>Hi User</h3>,<br/><br/>
       <h4> New User with Username :<b>${username}</b> and Password : <b>${password}</b> has been created/modified to access Organization Dashboard.</h4><br/><br/>
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
        html: `<h3>Hi User</h3>,<br/><br/>
       <h4> Username :<b>${username}</b> and Password : <b>${password}</b> has been modified to access Organization Dashboard.</h4><br/><br/>
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
        text: `hii username : ${OuserName} Your username Has been Updated.`,
        html: `<h3>Hi User</h3>,<br/><br/>
       <h4>Your Old Username :${OuserName} Now New User name is <b>${Nusername}</b> has been modified to access Organization Dashboard.</h4><br/><br/>
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
        html: `<h3>Hi User</h3>,<br/><br/>
       <h4> Your Updated Password is: <b>${password}</b> has been modified to access Organization Dashboard.</h4><br/><br/>
                <b>Website :</b><a href="${process.env.DOMAIN}">Click Here</a>`,

    }
    return await transport.sendMail(mail)
}