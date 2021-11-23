import { Client } from "@notionhq/client"

const notion = new Client({ auth: import.meta.env.VITE_NOTION_TOKEN ?? '' })

const databaseId = import.meta.env.VITE_NOTION_DATABASE_VOLUNTARIOS_ID

export async function post({ body }) {
    try {

        const params = JSON.parse(body)
        console.log(params)
        const response = await notion.pages.create({
        parent: {
            database_id: databaseId
        },
        properties: {
            Nombre: {
                type: 'title',
                title: [
                {
                    type: 'text',
                    text: {
                        content: params.name,
                    },
                },
                ],
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
            Email: {
                email: params.email    
            },
            Telefono: {
                phone_number: params.phone
            }
        },
    });
    console.log(response);
    return {
        body: body
    }
    } catch (error) {
        console.error(error.body)
    }

}