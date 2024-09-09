import axios from 'axios'

const Prod_Number = process.env.WP_NUMBER ? process.env.WP_NUMBER.split(',') : [];
const QC_Number = process.env.WP_NUMBER_MOD_QC ? process.env.WP_NUMBER_MOD_QC.split(',') : [];
const Rcv_Number = process.env.WP_NUMBER_MOD_Rcv ? process.env.WP_NUMBER_MOD_Rcv.split(',') : [];
//const template1 = "modify_request"
const WhatsappMsg = async (tablename: string, modifyBy: string, template: string,section:string) => {

    if (section === 'Production') {
        Prod_Number.map((num) => {
            const data = {
                messaging_product: "whatsapp",
                to: num,
                type: "template",
                template: {
                    name: template,
                    language: {
                        code: "en_US"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: tablename // This replaces {{1}}
                                },
                                {
                                    type: "text",
                                    text: modifyBy // This replaces {{2}}
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
    if (section === 'QC') {
        QC_Number.map((num) => {
            const data = {
                messaging_product: "whatsapp",
                to: num,
                type: "template",
                template: {
                    name: template,
                    language: {
                        code: "en_US"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: tablename // This replaces {{1}}
                                },
                                {
                                    type: "text",
                                    text: modifyBy // This replaces {{2}}
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
    if (section === 'Receiving') {

        Rcv_Number.map((num) => {
            const data = {
                messaging_product: "whatsapp",
                to: num,
                type: "template",
                template: {
                    name: template,
                    language: {
                        code: "en_US"
                    },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: tablename // This replaces {{1}}
                                },
                                {
                                    type: "text",
                                    text: modifyBy // This replaces {{2}}
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
export default WhatsappMsg