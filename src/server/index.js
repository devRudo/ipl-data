const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');
const pwd = process.cwd();
const outputPath = path.join(pwd + '/src/output/');
const matchesFilePath = path.join(pwd + '/src/data/matches.csv');
const deliveriesFilePath = path.join(pwd + '/src/data/deliveries.csv');

// Creatig output directory if does not exist
fs.stat(outputPath, (err, stats) => {
    if (err && err.errno == -2) {
        fs.mkdir(outputPath, (err) => {
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

let writefile = (filename, result) => {
    fs.writeFile(`${outputPath}${filename}`, JSON.stringify(result) + '\n', (err) => {
        if (err) {
            console.error("Opoops ! Something went wrong");
        }
        else {
            console.error(`${filename} is created successfully.`);
        }
    });
};
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
                .catch(err => console.error("Ooops something went wrong ... Unable to find the deliveries csv file"));
        }).catch(err => console.error("Ooops something went wrong ... Unable to find the matches csv file"));
}