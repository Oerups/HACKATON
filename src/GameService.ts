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
    },
    displayLayers: (type: string, answers: any) => {
        if(type === "trueFalse") {
            WA.room.hideLayer("zone-c");
            WA.room.hideLayer("zone-d");
            return ['zone-a', 'zone-b'];
        } else {
            let layers:any = [];
            answers.forEach((answer: any) => {
                if(answer.content != "") {
                    WA.room.showLayer(answer.name);
                    layers.push(answer.name);
                } else {
                    WA.room.hideLayer(answer.name);
                }
            });
            return layers;
        }
    },
    displayAllLayers: () => {
        WA.room.showLayer("zone-a");
        WA.room.showLayer("zone-b");
        WA.room.showLayer("zone-c");
        WA.room.showLayer("zone-d");
    },
    defineAnswers: (answers: any) => {
        const formattedAnswers = [
            {id: "", name: "zone-a", content: ""},
            {id: "", name: "zone-b", content: ""},
            {id: "", name: "zone-c", content: ""},
            {id: "", name: "zone-d", content: ""}
        ];

        for(let i = 0; i < answers.length; i++) {
            formattedAnswers[i].id = answers[i]._id;
            formattedAnswers[i].content = answers[i].content;
        }

        return formattedAnswers;
    },
    getCode: () => {
        const code = WA.state.loadVariable('code');
        return code;
    },
}

export default GameService;