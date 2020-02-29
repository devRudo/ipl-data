const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');
let pwd = process.cwd();
const matchesFilePath = path.join(pwd + '/src/data/matches.csv');
const deliveriesFilePath = path.join(pwd + '/src/data/deliveries.csv');

// Creatig output directory if does not exist
fs.stat(pwd + '/src/output', (err, stats) => {
    if (err && err.errno == -2) {
        fs.mkdir(pwd + '/src/output', (err) => {
            if (err) {
                console.error("Ooooops! unable to create directory");
            }
            else {
                console.log("Output Directory created successfully");
                writeOutputs();
            }
        });
    }
    else if (err) {
        console.error(err.errno);

    }
    else {
        writeOutputs();
    }
});

// Writing Outputs on the json files
let writeOutputs = () => {
    csv({
        checkType: true
    })
        .fromFile(matchesFilePath)
        .then((matches) => {
            csv({
                checkType: true
            }).fromFile(deliveriesFilePath)
                .then((deliveries) => {
                    fs.writeFile(pwd + '/src/output/matchesPerYear.json', JSON.stringify(ipl.matchesPerYear(matches)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('matchesPerYear.json is created successfully.');
                        }
                    });
                    fs.writeFile(pwd + '/src/output/matchesPerTeamPerYear.json', JSON.stringify(ipl.matchesPerTeamPerYear(matches)) + '\n', (err) => {
                        // Writing matches won per team per year
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('matchesPerTeamPerYear.json is created successfully.');
                        }
                    });
                    fs.writeFile(pwd + '/src/output/wonTossWonMatchPerTeam.json', JSON.stringify(extra.wonTossWonMatchPerTeam(matches)) + '\n', (err) => {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            console.error('wonTossWonMatchPerTeam.json is created successfully.');
                        }
                    });
                    fs.writeFile(pwd + '/src/output/playerHighManoftheMatchPerSeason.json', JSON.stringify(extra.playerHighManoftheMatchPerSeason(matches)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('playerHighManoftheMatchPerSeason.json is created successfully.');
                        }
                    });
                    fs.writeFile(pwd + '/src/output/mostEconomicalBowlerSuperOver.json', JSON.stringify(extra.bowlerWithBestEconomyInSuperOvers(deliveries)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('mostEconomicalBowlerSuperOver.json is created successfully.');
                        }
                    });
                    fs.writeFile(pwd + '/src/output/strikeRateViratPerseason.json', JSON.stringify(extra.strikeRateViratPerseason(matches, deliveries)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('strikeRateViratPerseason.json is created successfully.');
                        }
                    });
                    fs.writeFile(pwd + '/src/output/extraRunsPerTeam.json', JSON.stringify(ipl.extraRunsPerTeam(matches, deliveries, '2016')) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('extraRunsPerTeam.json is created successfully.');
                        }
                    });
                    fs.writeFile(pwd + '/src/output/topEconomicalBowlers.json', JSON.stringify(ipl.topEconomicalBowlers(matches, deliveries, '2015')) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('topEconomicalBowlers.json is created successfully.');
                        }
                    });
                    fs.writeFile(pwd + '/src/output/maxNumberofTimesofDissmissal.json', JSON.stringify(extra.playerDissmisal(deliveries)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('maxNumberofTimesofDissmissal.json is created successfully.');
                        }
                    });
                })
                .catch(err => console.error("Ooops something went wrong ... Unable to find the deliveries csv file"));
        }).catch(err => console.error("Ooops something went wrong ... Unable to find the matches csv file"));
}