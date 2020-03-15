const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const pwd = process.cwd();
require('dotenv').config();
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');
const outputPath = path.join(pwd + '/src/output/');
const matchesFilePath = path.join(pwd + '/src/data/matches.csv');
const deliveriesFilePath = path.join(pwd + '/src/data/deliveries.csv');

const { populateDeliveries, populateMatches } = require(pwd + '/src/server/database/populate');

// writing json outputs to files
let writefile = (filename, result) => {
    fs.writeFile(`${outputPath}${filename}`, JSON.stringify(result) + '\n', (err) => {
        if (err) {
            console.log("Opoops ! Something went wrong");
        }
        else {
            console.log(`${filename} is created successfully.`);
        }
    });
};

let populateAndWrite = () => {
    csv({
        checkType: true
    })
        .fromFile(matchesFilePath)
        .then((matches) => {
            // Insterting all matches data into postgres
            populateMatches(matches);
            csv({
                checkType: true
            }).fromFile(deliveriesFilePath)
                .then((deliveries) => {
                    // Insterting all delivery data into postgres
                    populateDeliveries(deliveries);

                    // Writing JSON results to file
                    writefile('matchesPerYear.json', ipl.matchesPerYear(matches));
                    writefile('matchesPerTeamPerYear.json', ipl.matchesPerTeamPerYear(matches));
                    writefile('wonTossWonMatchPerTeam.json', extra.wonTossWonMatchPerTeam(matches));
                    writefile('playerHighManoftheMatchPerSeason.json', extra.playerHighManoftheMatchPerSeason(matches));
                    writefile('mostEconomicalBowlerSuperOver.json', extra.bowlerWithBestEconomyInSuperOvers(deliveries));
                    writefile('strikeRateViratPerseason.json', extra.strikeRateViratPerseason(matches, deliveries));
                    writefile('extraRunsPerTeam.json', ipl.extraRunsPerTeam(matches, deliveries, '2016'));
                    writefile('topEconomicalBowlers.json', ipl.topEconomicalBowlers(matches, deliveries, '2015'));
                    writefile('maxNumberofTimesofDissmissal.json', extra.playerDissmisal(deliveries));
                })
                .catch(err => console.log("Ooops something went wrong ... Unable to find the deliveries csv file"));
        }).catch(err => console.log("Ooops something went wrong ... Unable to find the matches csv file"));
}


// Creatig output directory if does not exist
fs.stat(outputPath, (err, stats) => {
    if (err && err.errno == -2) {
        fs.mkdir(outputPath, (err) => {
            if (err) {
                console.error("Ooooops! unable to create directory");
            }
            else {
                console.log("Output Directory created successfully");
                populateAndWrite();
            }
        });
    }
    else if (err) {
        console.error(err.errno);

    }
    else {
        populateAndWrite();
    }
});

