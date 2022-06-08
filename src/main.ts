/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import io from "socket.io-client";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    WA.room.onEnterLayer('website').subscribe(async () => {
        const socket = io.connect("http://localhost:3003");
        socket.on('connect', () => {
            console.log('Connected to server');
            console.log(socket);

            const code = "RKTOERQ";
            fetch(`http://localhost:8000/room/${code}/join`, {
                headers: {
                    Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                    socketId: socket.id,
                    username: WA.player.name,
                }),
            }).then(res => res.json())
            .then(data => { 
                console.log(data);
            }
            ).catch(err => {
                console.log(err);
            });
        });

        
    }) 

    WA.room.onLeaveLayer('website').subscribe(() => {
        WA.nav.closeCoWebSite();
    })

    WA.room.onEnterLayer('zone-a').subscribe(() => {
        // fetch(`${config.url}/room/${this.$route.params.code}/answer`, {
        //     headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //     },
        //     method: "POST",
        //     body: JSON.stringify({
        //     socketId: this.socket.id,
        //     answer: answer._id,
        //     question: this.step._id,
        //     }),
        // })
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
