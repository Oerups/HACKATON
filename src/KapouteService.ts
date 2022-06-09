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
    sendAnswer: async (playerId: string | undefined, answerId: string, questionId: string, roomCode: string) => {
        const res = await fetch(`https://localhost:8081/room/${roomCode}/answer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: playerId,
                    answer: answerId,
                    question: questionId
            })
        });
        
        console.log(res);
    },
}

export default KapouteService;