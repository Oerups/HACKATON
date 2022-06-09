import { WorkAdventureApi } from "@workadventure/iframe-api-typings";

const GameService = {
    goCenter: (WA: WorkAdventureApi) => {
        WA.controls.disablePlayerControls();
        WA.player.moveTo(599, 257, 10);
        WA.controls.restorePlayerControls();
    }
}

export default GameService;