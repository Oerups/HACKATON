/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import KapouteService from "./KapouteService";
import GameService from "./GameService";

console.log('Script started successfully');

let currentPopup: any = undefined;  
let iframe:any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    const socket = KapouteService.connect();
    let answers: any = [];
    let activesLayers: any = [];
    let questionId = "";
    const answerPopUp = {
        popup: null,
        answered: true
    };

    let currentLayer = "";
    let code:any = GameService.getCode();
    
    WA.state.saveVariable('code', '');

    socket.on("GAME", (step: any) => {
        GameService.goCenter(WA);

        if (step.state === "QUESTION") {
            answers = GameService.defineAnswers(step.answers);
            questionId = step._id;
            activesLayers = GameService.displayLayers(step.type, answers);

            answerPopUp.answered = false;
        } else {
            GameService.displayAllLayers();
        }
    });

    WA.room.onEnterLayer('website').subscribe(async () => {
        currentLayer = "website";
        code = GameService.getCode();
        if (code == undefined || code == null) {
            WA.ui.openPopup("codePopup", 'Veuillez renseigner le code de la partie (Menu > Configure the room) ou demandez à un admin de le faire !', [{
                label: "Close",
                className: "primary",
                callback: (popup) => {
                    popup.close();
                }
            }]);
        } else if (iframe === undefined) {
            iframe = await WA.nav.openCoWebSite(`https://localhost:8081/iframe/${code}/username/${WA.player.name}/socketId/${socket.id}/userId/${WA.player.id}`);
            GameService.goCenter(WA);
        }
    })

    WA.room.onEnterLayer('game-entry').subscribe(async () => {
        currentLayer = "game-entry";
        if (iframe !== undefined) {
            WA.controls.disablePlayerControls();
            WA.ui.openPopup("quitGamePopup", 'Attention : si vous quittez la pièce, vous serez déconnecté de la partie en cours et ne pourrez plus la rejoindre.', [{
                label: "Close",
                className: "primary",
                callback: (popup) => {
                    popup.close();
                }
            }]);
            setTimeout(() => {
                WA.controls.restorePlayerControls();
            }, 2000);
        }
    })

    WA.room.onEnterLayer('game-exit').subscribe(() => {
        if (iframe !== undefined) {
            iframe.close();
            iframe = undefined;
        }
    })

    const codeSubscription = WA.state.onVariableChange('code').subscribe(async (value) => {
        code = value;
        if (currentLayer === "website") {
            iframe = await WA.nav.openCoWebSite(`https://localhost:8081/iframe/${code}/username/${WA.player.name}/socketId/${socket.id}`);
            GameService.goCenter(WA);
            codeSubscription.unsubscribe();
        }
    });

    WA.room.onEnterLayer('zone-a').subscribe(async () => {
        if (activesLayers.includes("zone-a")) {
            KapouteService.sendAnswer(WA.player.id, answers[0].id, questionId, code);
            GameService.handlePopup(answerPopUp);
        }
    })

    WA.room.onEnterLayer('zone-b').subscribe(async () => {
        if (activesLayers.includes("zone-b")) {
            KapouteService.sendAnswer(WA.player.id, answers[1].id, questionId, code);
            GameService.handlePopup(answerPopUp);
        }
    })

    WA.room.onEnterLayer('zone-c').subscribe(async () => {
        if (activesLayers.includes("zone-c")) {
            KapouteService.sendAnswer(WA.player.id, answers[2].id, questionId, code);
            GameService.handlePopup(answerPopUp);
        }
    })

    WA.room.onEnterLayer('zone-d').subscribe(async () => {
        if (activesLayers.includes("zone-d")) {
            KapouteService.sendAnswer(WA.player.id, answers[3].id, questionId, code);
            GameService.handlePopup(answerPopUp);
        }
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
