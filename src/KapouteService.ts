import io from "socket.io-client";

const KapouteService = {
    connect: () => {
        const socket = io.connect("http://localhost:3003");
        socket.on('connect', () => { 
            console.log('Connected to server');
        });
        console.log(socket);
        return socket;
    },
    sendAnswer: (answer: any) => {

    },
}

export default KapouteService;