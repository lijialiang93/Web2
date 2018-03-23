const express = require("express");
const router = express.Router();
const redisConnection = require("../redis-connection");
const nrpSender = require("../nrp-sender-shim");


router.get("/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "send-message-with-reply",
            data: {
                type: "get",
                id: req.params.id
            }
        });
        res.json(response.message);
    }
    catch (e) {
        res.json(e);
    }
});

router.post("/people", async (req, res) => {
    try {
        if (req.body.id == undefined) {
            throw { error: "you must provide an id" };
        }
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "send-message-with-reply",
            data: {
                type: "post",
                id: req.body.id,
                people: JSON.stringify(req.body)
            }
        });

        res.json(response.message);
    }
    catch (e) {
        res.json(e);
    }
});

router.delete("/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "send-message-with-reply",
            data: {
                type: "del",
                id: req.params.id
            }
        });

        res.json(response.message);
    }
    catch (e) {
        res.json(e);
    }
});

router.put("/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "send-message-with-reply",
            data: {
                type: "put",
                id: req.params.id,
                newData: JSON.stringify(req.body)
            }
        });

        res.json(response.message);
    }
    catch (e) {
        res.json(e);
    }
});


module.exports = router;