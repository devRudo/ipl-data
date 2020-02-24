
const fs = require('fs');
const conversion = require('./convertToJSON.js');
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');
let pwd = process.cwd();
let v8 = require('v8');


fs.writeFile(pwd + '/src/output/matchesPerYear.json', JSON.stringify(ipl.matchesPerYear(conversion.matchResult)) + '\n', function (err) {
    if (err) {
        console.error("Opoops ! Something went wrong");
    }
    console.log('matchesPerYear.json is created successfully.');
});

fs.writeFile(pwd + '/src/output/matchesPerTeamPerYear.json', JSON.stringify(ipl.matchesPerTeamPerYear(conversion.matchResult)) + '\n', function (err) {
    if (err) {
        console.error("Opoops ! Something went wrong");
    }
    console.log('matchesPerTeamPerYear.json is created successfully.');
});

fs.writeFile(pwd + '/src/output/wonTossWonMatchPerTeam.json', JSON.stringify(extra.wonTossWonMatchPerTeam(conversion.matchResult)) + '\n', function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('wonTossWonMatchPerTeam.json is created successfully.');
});

fs.writeFile(pwd + '/src/output/playerHighManoftheMatchPerSeason.json', JSON.stringify(extra.playerHighManoftheMatchPerSeason(conversion.matchResult)) + '\n', function (err) {
    if (err) {
        console.error("Opoops ! Something went wrong");
    }
    console.log('playerHighManoftheMatchPerSeason.json is created successfully.');
});

fs.writeFile(pwd + '/src/output/mostEconomicalBowlerSuperOver.json', JSON.stringify(extra.bowlerWithBestEconomyInSuperOvers(conversion.deliveryResult)) + '\n', function (err) {
    if (err) {
        console.error("Opoops ! Something went wrong");
    }
    console.log('mostEconomicalBowlerSuperOver.json is created successfully.');
});

fs.writeFile(pwd + '/src/output/strikeRateViratPerseason.json', JSON.stringify(extra.strikeRateViratPerseason(conversion.matchResult, conversion.deliveryResult)) + '\n', function (err) {
    if (err) {
        console.error("Opoops ! Something went wrong");
    }
    console.log('strikeRateViratPerseason.json is created successfully.');
});

fs.writeFile(pwd + '/src/output/extraRunsPerTeam.json', JSON.stringify(ipl.extraRunsPerTeam(conversion.matchResult, conversion.deliveryResult, '2016')) + '\n', function (err) {
    if (err) {
        console.error("Opoops ! Something went wrong");
    }
    console.log('extraRunsPerTeam.json is created successfully.');
});

fs.writeFile(pwd + '/src/output/topEconomicalBowlers.json', JSON.stringify(ipl.topEconomicalBowlers(conversion.matchResult, conversion.deliveryResult, '2015')) + '\n', function (err) {
    if (err) {
        console.error("Opoops ! Something went wrong");
    }
    console.log('topEconomicalBowlers.json is created successfully.');
});

fs.writeFile(pwd + '/src/output/maxNumberofTimesofDissmissal.json', JSON.stringify(extra.playerDissmisal(conversion.deliveryResult)) + '\n', function (err) {
    if (err) {
        console.error("Opoops ! Something went wrong");
    }
    console.log('maxNumberofTimesofDissmissal.json is created successfully.');
});