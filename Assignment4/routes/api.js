const express = require("express");
const router = express.Router();
const data = require("../data");
const redis = require("redis");
const promise = require("bluebird");
const peopleData = data.people;
const client = promise.promisifyAll(redis.createClient())

router.get("/people/history", async (req, res) => {
  try {
    let reply = await client.lrangeAsync('jlhistory', 0, 19);
    let history = [];
    reply.forEach(function (element) {
      history.push(JSON.parse(element));
    });
    res.json(history);
  }
  catch (e) {
    console.log(e);
  }
});

router.get("/people/:id", async (req, res) => {
  try {
    let people = await client.getAsync(req.params.id);
    //not in cache
    if (people === null) {
      people = await peopleData.getById(req.params.id);
      client.set(req.params.id, JSON.stringify(people));
      client.lpush(['jlhistory', JSON.stringify(people)]);
    }
    //in cache
    else {
      client.lpush(['jlhistory', people]);
      people = JSON.parse(people);
    }

    res.json(people);

  } catch (e) {
    res.status(404).json({ error: e.toString() });
  }
});



module.exports = router;