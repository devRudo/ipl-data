
const fs = require('fs');
const conversion = require('./convertToJSON.js');
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');
let pwd = process.env.PWD;

fs.writeFile(pwd + '/../output/matchesPerYear.json', JSON.stringify(ipl.matchesPerYear(conversion.matchResult)) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});

fs.writeFile(pwd + '/../output/matchesPerTeamPerYear.json', JSON.stringify(ipl.matchesPerTeamPerYear(conversion.matchResult)) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});

fs.writeFile(pwd + '/../output/wonTossWonMatchPerTeam.json', JSON.stringify(extra.wonTossWonMatchPerTeam(conversion.matchResult)) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});

fs.writeFile(pwd + '/../output/playerHighManoftheMatchPerSeason.json', JSON.stringify(extra.playerHighManoftheMatchPerSeason(conversion.matchResult)) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});

fs.writeFile(pwd + '/../output/mostEconomicalBowlerSuperOver.json', JSON.stringify(extra.bowlerWithBestEconomyInSuperOvers(conversion.deliveryResult)) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});

fs.writeFile(pwd + '/../output/strikeRateViratPerseason.json', JSON.stringify(extra.strikeRateViratPerseason(conversion.matchResult, conversion.deliveryResult)) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});

fs.writeFile(pwd + '/../output/extraRunsPerTeam.json', JSON.stringify(ipl.extraRunsPerTeam(conversion.matchResult, conversion.deliveryResult, '2016')) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});

fs.writeFile(pwd + '/../output/topEconomicalBowlers.json', JSON.stringify(ipl.topEconomicalBowlers(conversion.matchResult, conversion.deliveryResult, '2015')) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});

fs.writeFile(pwd + '/../output/maxNumberofTimesofDissmissal.json', JSON.stringify(extra.playerDissmisal(conversion.deliveryResult)) + '\n', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});