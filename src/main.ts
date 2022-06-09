/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import KapouteService from "./KapouteService";
import GameService from "./GameService";

console.log('Script started successfully');

let currentPopup: any = undefined;  


// Waiting for the API to be ready
WA.onInit().then(() => {
    const socket = KapouteService.connect();
    const code = "R41N9ME";
    const answers = {
        zone_a: "",
        zone_b: "",
        zone_c: "",
        zone_d: ""
    }
    let questionId = "";

    socket.on("GAME", (step: any) => {
        GameService.goCenter(WA);
        if (step.state === "QUESTION") {
            answers.zone_a = step.answers[0]._id;
            answers.zone_b = step.answers[1]._id;
            answers.zone_c = step.answers[2]._id;
            answers.zone_d = step.answers[3]._id;
            questionId = step._id;
            console.log(answers)
        }
    });

    WA.room.onEnterLayer('website').subscribe(async () => {
        await WA.nav.openCoWebSite(`https://localhost:8081/iframe/${code}/username/${WA.player.name}/socketId/${socket.id}`);
        GameService.goCenter(WA);
    }) 

    WA.room.onEnterLayer('zone-a').subscribe(async () => {
         // send answer to server
         // answers.zone_a
        KapouteService.sendAnswer(WA.player.id, answers.zone_a, questionId, code);
    })

    WA.room.onEnterLayer('zone-b').subscribe(async () => {
         // send answer to server
        GameService.goCenter(WA);
    })

    WA.room.onEnterLayer('zone-c').subscribe(async () => {
         // send answer to server
        GameService.goCenter(WA);
    })

    WA.room.onEnterLayer('zone-d').subscribe(async () => {
         // send answer to server
        GameService.goCenter(WA);
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
