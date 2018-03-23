const axios = require("axios");
const redisConnection = require("./redis-connection");
const url = "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json";


async function init(url) {
    try {
        let map = new Map();
        let response = await axios.get(url);
        response.data.forEach(element => {
            let id = element.id;
            let people = JSON.stringify(element);
            map.set(id, people);
        });


        redisConnection.on("send-message-with-reply:request:*", (message, channel) => {
            let requestId = message.requestId;
            let eventName = message.eventName;

            let messageText = message.data.message;
            let successEvent = `${eventName}:success:${requestId}`;
            let failedEvent = `${eventName}:failed:${requestId}`;

            let type = message.data.type;
            let id;
            switch (type) {
                case "get":
                    id = parseInt(message.data.id);
                    if (map.get(id) != undefined) {
                        //id exists
                        redisConnection.emit(successEvent, {
                            requestId: requestId,
                            data: {
                                message: JSON.parse(map.get(id))
                            },
                            eventName: eventName
                        });
                    }
                    else {
                        //id not exists
                        redisConnection.emit(failedEvent, {
                            requestId: requestId,
                            data: {
                                error: "id not found"
                            },
                            eventName: eventName
                        });
                    }

                    break;
                case "post":
                    newPeople = message.data.people;
                    id = parseInt(message.data.id);
                    if (map.get(id) == undefined) {
                        //id not exists, insert new data
                        map.set(id, newPeople);
                        redisConnection.emit(successEvent, {
                            requestId: requestId,
                            data: {
                                message: JSON.parse(map.get(id))
                            },
                            eventName: eventName
                        });

                    }
                    else {
                        //id exists
                        redisConnection.emit(failedEvent, {
                            requestId: requestId,
                            data: {
                                error: "id already existed"
                            },
                            eventName: eventName
                        });
                    }

                    break;
                case "put":
                    id = parseInt(message.data.id);
                    if (map.get(id) != undefined) {
                        //id exists, prepare to change data
                        oldData = JSON.parse(map.get(id));
                        newData = JSON.parse(message.data.newData);
                        if (newData.id != undefined && newData.id != id) {
                            //new data id not equals to the params id
                            redisConnection.emit(failedEvent, {
                                requestId: requestId,
                                data: {
                                    error: "user id is not allowed to change"
                                },
                                eventName: eventName
                            });
                            break;
                        }
                        oldData.first_name = newData.first_name == undefined ? oldData.first_name : newData.first_name;
                        oldData.last_name = newData.last_name == undefined ? oldData.last_name : newData.last_name;
                        oldData.email = newData.email == undefined ? oldData.email : newData.email;
                        oldData.gender = newData.gender == undefined ? oldData.gender : newData.gender;
                        oldData.ip_address = newData.ip_address == undefined ? oldData.ip_address : newData.ip_address;
                        map.set(id, JSON.stringify(oldData));
                        redisConnection.emit(successEvent, {
                            requestId: requestId,
                            data: {
                                message: JSON.parse(map.get(id))
                            },
                            eventName: eventName
                        });
                    }
                    else {
                        redisConnection.emit(failedEvent, {
                            requestId: requestId,
                            data: {
                                error: "id not found"
                            },
                            eventName: eventName
                        });
                    }

                    break;
                case "del":
                    id = parseInt(message.data.id);
                    if (map.get(id) != undefined) {
                        //id exists
                        map.delete(id);
                        redisConnection.emit(successEvent, {
                            requestId: requestId,
                            data: {
                                message: {
                                    success: "user " + id + " deleted"
                                }
                            },
                            eventName: eventName
                        });
                    }
                    else {
                        //id not exists
                        redisConnection.emit(failedEvent, {
                            requestId: requestId,
                            data: {
                                error: "id not found"
                            },
                            eventName: eventName
                        });
                    }
                    break;
                default:
                    break;
            }

        });
    }
    catch (e) {
        console.log(e);
    }

}

init(url);



