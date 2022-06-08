/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    WA.room.onEnterLayer('website').subscribe(async () => {
        await WA.nav.openCoWebSite('http://localhost:8081/');
        console.log(WA.player);
    }) 

    WA.room.onLeaveLayer('website').subscribe(() => {
        WA.nav.closeCoWebSite();
    })

    WA.room.onEnterLayer('zone-a').subscribe(() => {
        WA.chat.sendChatMessage("zone A", "Brigitte Bardot");
    })     

    WA.room.onEnterLayer('zone-b').subscribe(() => {
        WA.chat.sendChatMessage("zone B", "Steven Spielberg");
    })

    WA.room.onEnterLayer('zone-c').subscribe(() => {
        WA.chat.sendChatMessage("zone C", "Mickael Younes");
    })

    WA.room.onEnterLayer('zone-d').subscribe(() => {
        WA.chat.sendChatMessage("zone D", "Ton père l'enculé");
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
