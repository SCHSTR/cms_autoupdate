import dotenv from 'dotenv'
import axios from 'axios'

import { DateTime } from 'luxon'

dotenv.config()

export async function deleteItemsFromCMS(cmsItems){
    const actualDate = new Date().toISOString().split("T")[0]

    cmsItems.forEach(item => {
        const eventType = item['opportunity-category-2']
        if(eventType != '62c845070807831ba391b58c') return

        const eventDate = item['end-date'].toString().split("T")[0]
        const isRunning = isEventRunning(eventDate, actualDate)

        //if(isRunning) return
        
        console.log(item._id)
        console.log(item.name)
        console.log(item['end-date'])

        const convert = DateTime.fromISO(item['end-date']).toISO()
        const today = DateTime.now().toISO()
        console.log(convert, today)

        //console.log(isRunning)
        console.log(" ")
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        console.log(" ")

        // axios({
        //     method: 'DELETE',
        //     url: `https://api.webflow.com/collections/${process.env.C_ID_OPPORTUNITITIES}/items/${item._id}`,
        //     headers: {
        //         'Authorization': `Bearer ${process.env.WEBFLOW_TOKEN_BEATSTARS}`,
        //         'content-type': 'application/json',
        //         'Accept-Version': '1.0.0'
        //     }
        // }).then(res => console.log(`O item ${item.name} foi deletado com sucesso!`)).catch(err => console.log(`Ops, algo deu errado no item ${item.name}!`))
        
    })

    console.log("DELETE SCRIPT RAN")
}

function isEventRunning(d1, d2){
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    if(date1 < date2) return false
    if(date1 > date2) return true
    if(date1 == date2) return 1
}