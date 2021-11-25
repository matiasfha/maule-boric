import { Client } from "@notionhq/client"

const notion = new Client({ auth: import.meta.env.VITE_NOTION_TOKEN ?? '' })

const databaseId = import.meta.env.VITE_NOTION_DATABASE_CALENDAR_ID

export async function get() {
    try {
        
        const response = await notion.databases.query({
            database_id: databaseId
        })
        const result = response.results.map(page => {
            const { properties } = page
            return {
                comuna: properties.Comuna.select.name,
                contacto: properties.Contacto.rich_text[0].plain_text,
                date: properties.Date.date.start,
                address: properties.Direccion.rich_text[0].plain_text,
                name: properties.Name.title[0].plain_text,
            }
        })
        return {
            body: result
        }
    } catch (error) {
        console.error(error.body)
        return  {
            status: 500,
            body: error
        }
    }

}