//OLD METHOD - THIS IS WORKING
//CONVERTING EVERYTHING FOR MODULE TO
//HAVE A BETTER CODE

//require('dotenv').config()
// const Webflow = require('webflow-api')
// const axios = require('axios')

//NEW METHOD - THIS IS WIP
import { cmsResponse, prodResponse } from './sources/opportunities.services.js'
import { compareAndCreateCMS } from './createAndCompareCMS.js'
import { deleteItemsFromCMS } from './deleteItemsFromCMS.js'

import * as cron from 'node-cron'


async function main(){
    

    const cmsItems = cmsResponse.items
    const prodItems = prodResponse.data.response.data.list
    const createItems = []

    cron.schedule('0 0 */3 * * *', function(){
        compareAndCreateCMS(cmsItems, prodItems, createItems)
        deleteItemsFromCMS(cmsItems)
    });

    compareAndCreateCMS(cmsItems, prodItems, createItems)
    deleteItemsFromCMS(cmsItems)
    
    console.log("All scripts are running")
}

main()