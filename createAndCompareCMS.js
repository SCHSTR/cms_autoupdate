import axios from "axios"
import { webflow_url } from "./sources/path.js"

export async function compareAndCreateCMS(cmsItems, prodItems, createItems){
    await prodItems.forEach((item) => {
        let hasItemInCMS = cmsItems.find(cmsItem => cmsItem.name == item.title)

        if(!hasItemInCMS){
            createItems.push(item)
        }
    })
    createItems.forEach(item => {
        const title = item.title

        //const slug = title.replace('-','').split(/[ ,]+/).join('-').toLowerCase()
        const desired = title.replace(/[^\w\s]/gi, '')
        const newslug = desired.toLowerCase().split(/[ ,]+/).join('-')
        
        let showType = null

        //GET THE TYPE OF THE EVENT ACCORDING EVENT TITLE
        function getEventType(){
            const types = ["remix", "song", "playlist", "remix", "made", "battle", "friday", "cypher", "looped"]
            const titleArray = title.toLowerCase().split(' ')
            
            types.forEach(type => {
                const worldsFromTitle = titleArray.find(eventName => eventName === type)
                switch (worldsFromTitle) {
                    case "beat":
                        const isChallenge = worldsFromTitle.find(eventType => eventType == "challenge")
                        if(!isChallenge) return showType = '62c845079abdbb5900ec3c90'
                        showType = '62c8450717b3473e6efcd3c9'
                        break
                    case "remix":
                        showType = '62c84507cb2d27539eda0510'
                        break;
                    case "song":
                        showType = '62c84507adfe0a08863cb04f'
                        break;
                    case "playlist":
                        showType = '62c845070807831ba391b58c'
                        break;
                    case "made":
                    case "battle":
                    case "friday":
                    case "cypher":
                    case "looped": {
                        showType = '62d81715fe02b9c104e5a0d4'
                        break;
                    }
                }
            })
        }

        getEventType()

        const POST_HEADERS = {
            headers: {
                'Authorization': `Bearer ${process.env.WEBFLOW_TOKEN_BEATSTARS}`,
                'content-type': 'application/json'
            }
        }

        const POST_DATA = {
            fields: {
                name: item.title,
                'thumbnail-image': {
                    fileId: '62d874799abaa66a8a5d20b9',
                    url: item.artwork,
                    alt: null
                  },
                slug: newslug,
                _archived: false,
                _draft: false,
                'submission-link': `https://www.beatstars.com/opportunities/active/${item.opportunity_id}`,
                description: item.details,
                'opportunity-category-2': showType,
                'starting-date': new Date(item.start_date),
                'end-date': new Date(item.close_date)
            }
        }

        axios.post(webflow_url, POST_DATA, POST_HEADERS).then((res) => {
            console.log(`The item ${item.title} was created succefully!`);
        }).catch((err) => {
            console.log(`The item ${item.title} has fail to be created. || ERROR: ` + err.data);
        })
    })

    console.log("COMPARE AND CREATE SCRIPT RAN")
}