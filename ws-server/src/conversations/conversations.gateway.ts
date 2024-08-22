import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(3001, {}) // first is port, if not specified it will be the app port, second one is for options
export class ConversationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server; // whole server, you can use this to broadcast events to all connected clients

    handleConnection(client: Socket, ...args: any[]) { // use this to handle new connections
        this.server.emit('user-joined', { message: `A new user has joined: ${client.id}` })
    }

    handleDisconnect(client: Socket) { // use this to handle disconnections
        this.server.emit('user-left', { message: `User left: ${client.id}` })
    }

    @SubscribeMessage('send-message') // this will be called when a client emits the 'send-message' event
    handleNewMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
        this.server.emit('broadcast', 'broadcasting...') // this will emit the 'broadcast' event to all connected clients

        client.emit('receive-message', { message: data }) // this will emit the 'receive-message' event to the current client only

        return data;
    }
}