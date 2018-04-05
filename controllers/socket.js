import ChatModel from '../models/chat';
import * as db from '../data/db';

export const socketCon = async (socket) => {
    try {
        let aMessageList = await db.find(ChatModel)({})({});
        socket.emit('receive', aMessageList);
        socket.on('postMessage', function (data) {
            var chat = new ChatModel();
            chat.content = data.content;
            chat.avatar = data.avatar;
            chat.username = data.username;
            chat.githubId = data.githubId;
            chat.save((err, doc) => {
                socket.broadcast.emit('receive', doc);
                socket.emit('receive', doc);
            });        
        });
    } catch(err) {
        console.log(err);
    }
    
}