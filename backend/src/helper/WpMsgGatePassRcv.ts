import axios from 'axios'

const Number_IN_RCN = process.env.WP_NUMBER_IN_RCN ? process.env.WP_NUMBER_IN_RCN.split(',') : [];
const Number_IN_PC = process.env.WP_NUMBER_IN_PC ? process.env.WP_NUMBER_IN_PC.split(',') : [];
const Number_IN_STORE = process.env.Number_IN_STORE ? process.env.Number_IN_STORE.split(',') : [];
const WP_NUMBER_SECURITY = process.env.WP_NUMBER_SECURITY ? process.env.WP_NUMBER_SECURITY.split(',') : [];
const WP_NUMBER_GATEPASS_MANAGER = process.env.WP_NUMBER_GATEPASS_MANAGER ? process.env.WP_NUMBER_GATEPASS_MANAGER.split(',') : [];
//const template1 = "modify_request"
const WpMsgGatePassRcv = async (tablename: string, gatepassNo: string, template: string,section:string) => {

    if (template === 'gatepass_rcv_dispatch') {
        if (section === 'RCN Cashew IN') {
            Number_IN_RCN.map((num) => {
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
                                        text: tablename // This replaces {{1}}
                                    },
                                    {
                                        type: "text",
                                        text: gatepassNo // This replaces {{2}}
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
        if (section === 'PC IN') {
            Number_IN_PC.map((num) => {
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
                                        text: tablename // This replaces {{1}}
                                    },
                                    {
                                        type: "text",
                                        text: gatepassNo // This replaces {{2}}
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
        if (section === 'STORE ENTRY') {
            Number_IN_STORE.map((num) => {
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
                                        text: tablename // This replaces {{1}}
                                    },
                                    {
                                        type: "text",
                                        text: gatepassNo // This replaces {{2}}
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
    if (template === 'rcv_dispatch_complt' ) {

        WP_NUMBER_SECURITY.map((num) => {
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
                                    text: tablename // This replaces {{1}}
                                },
                                {
                                    type: "text",
                                    text: gatepassNo // This replaces {{2}}
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

    if (template === 'verify_gatepass') {

        WP_NUMBER_GATEPASS_MANAGER.map((num) => {
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
                                    text: tablename // This replaces {{1}}
                                },
                                {
                                    type: "text",
                                    text: gatepassNo // This replaces {{2}}
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
    if ( template === 'gatepass_release') {

        WP_NUMBER_SECURITY.map((num) => {
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
                                    text: gatepassNo // This replaces {{1}}
                                },
                                {
                                    type: "text",
                                    text: tablename // This replaces {{2}}
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
export default WpMsgGatePassRcv