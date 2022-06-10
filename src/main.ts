/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import KapouteService from "./KapouteService";
import GameService from "./GameService";

console.log('Script started successfully');

let currentPopup: any = undefined;  


// Waiting for the API to be ready
WA.onInit().then(() => {
    const socket = KapouteService.connect();
    const code = "RWQ5L1B";
    let answers: any = [];

    let questionId = "";
    const answerPopUp = {
        popup: null,
        answered: true
    };

    GameService.goCenter(WA);

    socket.on("GAME", (step: any) => {
        GameService.goCenter(WA);

        if (step.state === "QUESTION") {
            answers = GameService.defineAnswers(step.answers);
            questionId = step._id;
            
            GameService.displayLayers(WA, step.type, answers);

            answerPopUp.answered = false;
        } else {
            GameService.displayAllLayers();
        }
    });

    WA.room.onEnterLayer('website').subscribe(async () => {
        await WA.nav.openCoWebSite(`https://localhost:8081/iframe/${code}/username/${WA.player.name}/socketId/${socket.id}/userId/${WA.player.id}`);
        GameService.goCenter(WA);
    }) 

    WA.room.onEnterLayer('zone-a').subscribe(async () => {
        KapouteService.sendAnswer(WA.player.id, answers[0].id, questionId, code);
        GameService.handlePopup(answerPopUp);
    })

    WA.room.onEnterLayer('zone-b').subscribe(async () => {
        KapouteService.sendAnswer(WA.player.id, answers[1].id, questionId, code);
        GameService.handlePopup(answerPopUp);
    })

    WA.room.onEnterLayer('zone-c').subscribe(async () => {
        KapouteService.sendAnswer(WA.player.id, answers[2].id, questionId, code);
        GameService.handlePopup(answerPopUp);
    })

    WA.room.onEnterLayer('zone-d').subscribe(async () => {
        KapouteService.sendAnswer(WA.player.id, answers[3].id, questionId, code);
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
