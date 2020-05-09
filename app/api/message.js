// 导入WebSocket模块:
// const WebSocket = require('ws');
// // 引用Server类:
// const WebSocketServer = WebSocket.Server;
// // 实例化:
// const wss = new WebSocketServer({
//     port: 8181
// });

// const User = require('../model/user')



// wss.on('connection', function (ws) {
//     console.log('client connected');
//     ws.wss = wss
//     ws.on('message', async function (message) {
//         let data = JSON.parse(message)
//         console.log(data)
//         let userId = data.userId
//         let user = await User.findUser(userId)
//         let text = data.text
//         if (text && text.trim()) {
//             let msg = createMessage('chat', {userName: user.userName,userId:user.userId}, text.trim(),user.created_at);
//             this.wss.broadcast(msg);
//         }
//     });
// });

// wss.broadcast = function (data) {
//     wss.clients.forEach(function (client) {
//         client.send(data);
//     });
// };


// // 消息ID:
// var messageIndex = 0;

// function createMessage(type, user, data,createTime) {
//     messageIndex ++;
//     return JSON.stringify({
//         id: messageIndex,
//         type: type,
//         user: user,
//         data: data,
//         createTime: createTime
//     });
// }


const io = require('socket.io')
var hashName = []
class InitSocket {
    static initCore(app) {
        InitSocket.ioApp = io(app)
        InitSocket.ioApp.on('connection',function (socket) {
            console.log('新加入一个连接。');
            socket.on('setJoin', function (data) {
                console.log(data);
                var name = data.userId;
                // // 储存上线的用户
                hashName[name] = socket.id;
            });
            socket.on('sayTo', function (data) {
                var toName = data.userId;
                var toId = data.id;
                if (toId = hashName[toName]) {
                    // nodejs的underscore扩展中的findWhere方法，可以在对象集合中，通过对象的属性值找到该对象并返回。
                    var toSocket = _.findWhere(io.sockets.sockets, {id: toId});
         
                    // socket.emit() ：向建立该连接的客户端广播
                    // socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
                    // io.sockets.emit() ：向所有客户端广播，等同于上面两个的和
         
                    // 通过该连接对象（toSocket）与链接到这个对象的客户端进行单独通信
                    toSocket.emit('message', data.msg);
                }
            });
            // 当关闭连接后触发 disconnect 事件
            socket.on('disconnect', function () {
                console.log('断开一个连接。');
            });
        })
    } 
}




module.exports = InitSocket




