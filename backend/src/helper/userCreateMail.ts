import { transport } from './mailTransporter';

export const userCreatedMail = async (email: string, username: string, password: string) => {
    const mail = {
        from: {
            name: "Payal Dealers Pvt Ltd",
            address: process.env.EMAIL_USER!
        },
        to: email,
        subject: "User Creation in PAYAL Dealers Pvt. Ltd",
        text: `Your username with : ${username} has been created.`,
        html: `<h1>Your username with ${username} has been created.</h1>`
    }
    return await transport.sendMail(mail)
}