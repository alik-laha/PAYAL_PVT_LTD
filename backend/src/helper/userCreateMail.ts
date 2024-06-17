import { transport } from './mailTransporter';

export const userCreatedMail = async (email: string, username: string, password: string) => {
    const mail = {
        from: {
            name: "Payal Dealers Pvt Ltd",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "Dashboard User Credential of PAYAL Dealers Pvt. Ltd",
        text: `Your username : ${username} has been created.`,
        html: `<h3>Hii,<br/>username <b>${username}</b> with Password <b>${password}</b> has been created to access Organization Dashboard.</h3><br/><br/>
                <b>Website :</b><a href="${process.env.DOMAIN}">Click Here</a>`,

    }
    return await transport.sendMail(mail)
}