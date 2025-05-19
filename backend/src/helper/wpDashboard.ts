import axios from 'axios'

const Number_Basic = process.env.WP_NUMBER_D_BASIC ? process.env.WP_NUMBER_D_BASIC.split(',') : [];

export const WpMsgGatePassDashboard = async (info: string, template: string) => {

    
    if (template === 'dashboard_basic' ) {

        Number_Basic.map((num) => {
                const data = {
                    messaging_product: "whatsapp",
                    to: num,
                    type: "template",
                    template: {
                        name: template,
                        language: {
                            code: "en"
                        },
                        components: [
                            {
                                type: "body",
                                parameters: [
                                    {
                                        type: "text",
                                        text: info // This replaces {{1}}
                                    }
                                  
                                ]
                            }
                        ]
                    }
                }
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

   
    




}