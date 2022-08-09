import dotenv from 'dotenv'
import Webflow from "webflow-api"
dotenv.config()

export const webflow = new Webflow({token: process.env.WEBFLOW_TOKEN_BEATSTARS})
export const webflow_url = `https://api.webflow.com/collections/${process.env.C_ID_OPPORTUNITITIES}/items`
