import axios from 'axios'

const WhatsappMsg = async (msg: string) => {
    const data = {
        messaging_product: "whatsapp",
        to: "+918610808251",
        type: "template",
        template: {
            name: "hello_world",
            language: {
                code: "en_US"
            }
        }
    };

    try {
        axios.post(process.env.WP_API_URL!, data, {
            headers: {
                'Authorization': `Bearer ${process.env.WP_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response)
            return response
        }).catch((err) => {
            console.log(err)
            return err
        })

    }
    catch {
        (err: any) => {
            console.log(err)
            return err
        }
    }
}
export default WhatsappMsg