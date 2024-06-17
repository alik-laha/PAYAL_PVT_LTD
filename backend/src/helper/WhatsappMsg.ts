import twilio from "twilio"

const accountSid = process.env.WP_ACOUNT_SID
const authToken = process.env.WP_AUTH_TOKEN
const client = twilio(accountSid, authToken)

const WhatsappMsg = async (msg: string) => {
    const send = await client.messages.create({
        body: msg,
        from: process.env.WP_FROM_NUMBER,
        to: "+918610808251"
    })
    return send
}

export default WhatsappMsg