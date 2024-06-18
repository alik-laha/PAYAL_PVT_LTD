import axios from 'axios'

const Number = ["+918610808251", "+917362926736"]
const tamplete = "hello_world"
const WhatsappMsg = async (msg: string) => {

    Number.map((num) => {
        const data = {
            messaging_product: "whatsapp",
            to: num,
            type: "template",
            template: {
                name: tamplete,
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

    })



}
export default WhatsappMsg