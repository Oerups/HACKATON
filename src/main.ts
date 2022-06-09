/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import KapouteService from "./KapouteService";

console.log('Script started successfully');

let currentPopup: any = undefined;  


// Waiting for the API to be ready
WA.onInit().then(() => {
    const socket = KapouteService.connect();
    const code = "R9L87AZ";
    WA.room.onEnterLayer('website').subscribe(async () => {
        const test = await WA.nav.openCoWebSite(`http://localhost:8081/iframe/${code}/username/${WA.player.name}/socketId/${socket.id}`);
        console.log(test);
    }) 

   

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
