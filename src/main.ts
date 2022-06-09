/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import KapouteService from "./KapouteService";
import GameService from "./GameService";

console.log('Script started successfully');

let currentPopup: any = undefined;  


// Waiting for the API to be ready
WA.onInit().then(() => {
    const socket = KapouteService.connect();
    const code = "R2DRW2C";
    const answers = {
        zone_a: "",
        zone_b: "",
        zone_c: "",
        zone_d: ""
    }
    let questionId = "";
    const answerPopUp = {
        popup: null,
        answered: true
    };

    GameService.goCenter(WA);

    socket.on("GAME", (step: any) => {
        GameService.goCenter(WA);
        if (step.state === "QUESTION") {
            answers.zone_a = step.answers[0]._id;
            answers.zone_b = step.answers[1]._id;
            answers.zone_c = step.answers[2]._id;
            answers.zone_d = step.answers[3]._id;
            questionId = step._id;
            answerPopUp.answered = false;
            console.log(answers)
        }
    });

    WA.room.onEnterLayer('website').subscribe(async () => {
        await WA.nav.openCoWebSite(`https://localhost:8081/iframe/${code}/username/${WA.player.name}/socketId/${socket.id}/userId/${WA.player.id}`);
        GameService.goCenter(WA);
    }) 

    WA.room.onEnterLayer('zone-a').subscribe(async () => {
        KapouteService.sendAnswer(WA.player.id, answers.zone_a, questionId, code);
        GameService.handlePopup(answerPopUp);
    })

    WA.room.onEnterLayer('zone-b').subscribe(async () => {
        KapouteService.sendAnswer(WA.player.id, answers.zone_b, questionId, code);
        GameService.handlePopup(answerPopUp);
    })

    WA.room.onEnterLayer('zone-c').subscribe(async () => {
        KapouteService.sendAnswer(WA.player.id, answers.zone_c, questionId, code);
        GameService.handlePopup(answerPopUp);
    })

    WA.room.onEnterLayer('zone-d').subscribe(async () => {
        KapouteService.sendAnswer(WA.player.id, answers.zone_d, questionId, code);
        GameService.handlePopup(answerPopUp);
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
