import { WorkAdventureApi } from "@workadventure/iframe-api-typings";

const GameService = {
    goCenter: (WA: WorkAdventureApi) => {
        WA.controls.disablePlayerControls();
        WA.player.moveTo(599, 257, 10).then(() => {
            WA.controls.restorePlayerControls();
        });
    },
    handlePopup: (answerPopUp: Object) => {
        if (!answerPopUp.answered) {
            answerPopUp.popup = WA.ui.openPopup("answerPopUp", `Votre réponse a été envoyée.`, []);
            answerPopUp.answered = true;
            setTimeout(() => {
                answerPopUp.popup.close();
            }, 2000);
        }
    }
}

export default GameService;