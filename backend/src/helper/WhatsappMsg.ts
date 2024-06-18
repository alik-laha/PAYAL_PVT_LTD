import axios from 'axios'

const Number = ["+918610808251"]
const template1 = "modify_request"
const WhatsappMsg = async (msg: string) => {

    Number.map((num) => {
        const data = {
            messaging_product: "whatsapp",
            to: num,
            type: "template",
            template: {
                name: template1,
                language: {
                    code: "en_US"
                },
                components: [
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: "QC RCN Entry"
                            },
                            {
                                type: "text",
                                text: " ALik"
                            }
                        ]

                    }
                ]



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