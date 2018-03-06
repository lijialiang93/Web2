const peopleData = require('./lab5');

function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}
const exportedMethods = {
    async getById(id) {
        await sleep(5000);
        id--;
        let people = peopleData[id];
        if (people !== undefined) {
            return people;
        }
        else {
            throw new Error('NOT FOUND');
        }

    }
}

module.exports = exportedMethods;