import dotenv from 'dotenv'
import axios from "axios";
import { webflow } from "./path.js";
dotenv.config()

export const cmsResponse = await webflow.items({ collectionId: process.env.C_ID_OPPORTUNITITIES })
export const prodResponse = await axios.get(process.env.PRODUCTION_DATA_URL, {
    headers: {
        'Authorization': process.env.USER_TOKEN
    }
})