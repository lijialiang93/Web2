const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const static = express.static(__dirname + "/public");
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

app.use("/public", static);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
    socket.on('data', async function (data) {
        try {
            let response = await nrpSender.sendMessage({
                redis: redisConnection,
                eventName: "send-message-with-reply",
                data: data
            });
            socket.emit('reply', response);
            socket.broadcast.emit('reply', response);
        } catch (error) {
            console.log(error);
        }
       
    });
});


server.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
