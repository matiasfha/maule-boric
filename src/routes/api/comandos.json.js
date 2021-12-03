import { Client } from "@notionhq/client"
import {verify}  from 'hcaptcha';

const secret = import.meta.env.VITE_HCAPTCHA_SECRETKEY;


const notion = new Client({ auth: import.meta.env.VITE_NOTION_TOKEN ?? '' })

const databaseId = import.meta.env.VITE_NOTION_DATABASE_COMANDOS_ID

const storeInNotion = async (params) => {
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
            Coordinador: {
                type: 'rich_text',
                rich_text: [{
                    type: 'text',
                    text: {
                        content: params.coordinador,
                    }
                    
                }]
                
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
}

export async function post({ body, host }) {
    try {
         const params = JSON.parse(body)

        const {captchaToken } = params
        const recaptchaVerifyResponse = await fetch(
        `https://hcaptcha.com/siteverify?response=${captchaToken}&secret=${import.meta.env.VITE_HCAPTCHA_SECRETKEY}&sitekey=${import.meta.env.VITE_HCAPTCHA_SITEKEY}`,
            {
                method: 'POST'
            }
        );
        

        const json = await recaptchaVerifyResponse.json();
        if(json.success) {
            const res = await storeInNotion(params)
                return {
                    body: {
                        success: res
                    }
                }
        }else{
                return {
                    status: 400,
                    body: 'ReCAPTCHA failed. Please try again'
                };        
        }
    }catch(error) {
        console.error(error.body)
        return {
            status: 500,
            body: error
        }
    }
}