import { Client } from "@notionhq/client"
import { verify } from 'hcaptcha';

const secret = import.meta.env.VITE_HCAPTCHA_SECRETKEY;


const notion = new Client({ auth: import.meta.env.VITE_NOTION_TOKEN ?? '' })

const databaseId = "c67468cbbfa94db79ca9e29f1f2cb174"

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

        const res = await storeInNotion(params)
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