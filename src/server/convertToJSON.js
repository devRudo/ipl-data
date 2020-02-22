const fs = require('fs');

const pwd = process.env.PWD;
let matchResult = [];
let deliveryResult = [];

let data1 = fs.readFileSync(pwd + '/src/data/matches.csv', 'utf8', function (err, data) {
    return data;
});
let data2 = fs.readFileSync(pwd + '/src/data/deliveries.csv', 'utf8', function (err, data) {
    return data;
});

let rows1 = data1.split(/\r?\n/).filter((elem) => elem !== "");
let keys1 = rows1[0].split(",");

for (let i = 1; i < rows1.length; i++) {
    let obj1 = {};
    let currentRow1 = rows1[i].split(",");
    for (let j = 0; j < keys1.length; j++) {
        obj1[keys1[j]] = currentRow1[j];
    }
    matchResult.push(obj1);
}
let rows2 = data2.split(/\r?\n/).filter((elem) => elem !== "");
let keys2 = rows2[0].split(",");
for (let i = 1; i < rows2.length; i++) {
    let obj2 = {};
    let currentRow2 = rows2[i].split(",");
    for (let j = 0; j < keys2.length; j++) {
        obj2[keys2[j]] = currentRow2[j];
    }
    deliveryResult.push(obj2);
}

module.exports.matchResult = matchResult;
module.exports.deliveryResult = deliveryResult;
