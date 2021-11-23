import { Client } from "@notionhq/client"

const notion = new Client({ auth: import.meta.env.VITE_NOTION_TOKEN ?? '' })

const databaseId = import.meta.env.VITE_NOTION_DATABASE_GRUPOS_ID

export async function get() {
    try {
        // const response = await notion.databases.retrieve({
        //     database_id: databaseId
        // });
        const response = await notion.databases.query({
            database_id: databaseId
        })
        const result = response.results.map(page => {
            const { properties } = page
            return {
                link: properties.Enlace.url,
                name: properties.Nombre.title[0].plain_text
            }
        })
        return {
            body: result
        }
    } catch (error) {
        console.error(error.body)
    }

}