const axios = require("axios");
const key = "8483140-888f01ae9085aaba4c1e0f6f7";
const redisConnection = require("./redis-connection");


redisConnection.on("send-message-with-reply:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    let messageText = message.data.message;
    let successEvent = `${eventName}:success:${requestId}`;
    let failedEvent = `${eventName}:failed:${requestId}`;


    let username = message.data.username;
    let searchQuery = message.data.searchQuery;
    let userMessage = message.data.message;

    let response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: key,
            q: searchQuery
        }
    });
    let pictures = [];
    response.data.hits.forEach(function (hit) {
        picture = {
            preview: hit.previewURL,
            webformat: hit.webformatURL
        }
        pictures.push(picture);
    });
    redisConnection.emit(successEvent, {
        requestId: requestId,
        data: {
            pictures: pictures,
            username: username,
            userMessage: userMessage,
            searchQuery: searchQuery
        },
        eventName: eventName
    });

});