const fs = require('fs');

const pwd = process.cwd();
let matchResult = [];
let deliveryResult = [];

/* Reading the CSV files and getting the file content */
let matchescsv = fs.readFileSync(pwd + '/src/data/matches.csv', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
    return data;
});
let deliveriescsv = fs.readFileSync(pwd + '/src/data/deliveries.csv', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
    return data;
});


/* Conversion of csv data to Array of JSON Objects */
let rows1 = matchescsv.split(/\r?\n/).filter(row => row !== "");
let matchesColumns = rows1[0].split(",");

for (let i = 1; i < rows1.length; i++) {
    let match = {};
    let currentRowmatch = rows1[i].split(",");
    for (let j = 0; j < matchesColumns.length; j++) {
        match[matchesColumns[j]] = currentRowmatch[j];
    }
    matchResult.push(match);
}
let rows2 = deliveriescsv.split(/\r?\n/).filter(row => row !== "");
let deliveriesColumns = rows2[0].split(",");
for (let i = 1; i < rows2.length; i++) {
    let delivery = {};
    let currentRowDelivery = rows2[i].split(",");
    for (let j = 0; j < deliveriesColumns.length; j++) {
        delivery[deliveriesColumns[j]] = currentRowDelivery[j];
    }
    deliveryResult.push(delivery);
}

/* Exporting the two JSON Arrays for matches and deliveries */

module.exports.matchResult = matchResult;
module.exports.deliveryResult = deliveryResult;
