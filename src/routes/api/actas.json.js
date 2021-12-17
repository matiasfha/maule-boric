import { Client } from "@notionhq/client"
import { verify } from 'hcaptcha';

const secret = import.meta.env.VITE_HCAPTCHA_SECRETKEY;


const notion = new Client({ auth: import.meta.env.VITE_NOTION_TOKEN ?? '' })

const databaseId = "33dd47533f0c4f748d051bf7235807fe"

const storeInNotion = async (params) => {

    const response = await notion.pages.create({
        parent: {
            database_id: databaseId
        },
        properties: {
            Rut: {
                type: 'title',
                title: [
                    {
                        type: 'text',
                        text: {
                            content: params.rut,
                        },
                    },
                ],
            },
            Email: {
                email: params.email
            },
            Comuna: {
                type: 'rich_text',
                rich_text: [{
                    type: 'text',
                    text: {
                        content: params.comuna,
                    }

                }]

            },
            Ciudad: {
                type: 'rich_text',
                rich_text: [{
                    type: 'text',
                    text: {
                        content: params.ciudad,
                    }

                }]

            },
            Local: {
                type: 'rich_text',
                rich_text: [{
                    type: 'text',
                    text: {
                        content: params.local,
                    }

                }]

            },
            Mesa: {
                type: 'rich_text',
                rich_text: [{
                    type: 'text',
                    text: {
                        content: params.mesa,
                    }

                }]

            },
            Inicio: {
                type: 'rich_text',
                rich_text: [{
                    type: 'text',
                    text: {
                        content: params.inicio,
                    }

                }]

            },
            Cierre: {
                type: 'rich_text',
                rich_text: [{
                    type: 'text',
                    text: {
                        content: params.cierre,
                    }

                }]

            },
            Urna: {
                number: params.totalUrna

            },
            Boric: {
                number: params.totalBoric

            },
            Kast: {
                number: params.totalKast

            },
            Nulos: {
                number: params.totalNulos

            },
            Blancos: {
                number: params.totalBlancos
            },
            Observaciones: {
                type: 'rich_text',
                rich_text: [{
                    type: 'text',
                    text: {
                        content: params.observaciones,
                    }

                }]

            },
        },
    });
}

export async function post({ body, host }) {
    try {
        const params = JSON.parse(body)

        const res = await storeInNotion({
            ...params,
            totalUrna: parseInt(params.totalUrna),
            totalBoric: parseInt(params.totalBoric),
            totalKast: parseInt(params.totalKast),
            totalBlancos: parseInt(params.totalBlancos),
            totalNulos: parseInt(params.totalNulos)
        })
        return {
            body: {
                success: res
            }
        }
    } catch (error) {
        console.error(error.body)
        return {
            status: 500,
            body: error
        }
    }
}