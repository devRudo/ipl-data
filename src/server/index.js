const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');
let pwd = process.cwd();
const matchesFilePath = path.join(pwd + '/src/data/matches.csv');
const deliveriesFilePath = path.join(pwd + '/src/data/deliveries.csv');

console.time();

// Creatig  directory if does not exist
fs.stat(pwd + '/src/output', (err, stats) => {
    if (err && err.errno == -2) {
        fs.mkdir(pwd + '/src/output', (err) => {
            if (err) {
                console.error("Ooooops! unable to create directory");
            }
            else {
                // console.log("Output Directory created successfully");
                writeOutputs();
            }
        });
    }
    else if (err) {
        console.error(err);
    }
    else {
        writeOutputs();
    }
});

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
                    // /* Writing the number of matches played per year matchesPerYear.json file

                    // Example Output:
                    //     {
                    //     "year": number of matches played,
                    //     "2009": 57,
                    //     "2010": 60,
                    //     "2011": 73
                    // }

                    // */
                    fs.writeFile(pwd + '/src/output/matchesPerYear.json', JSON.stringify(ipl.matchesPerYear(matches)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('matchesPerYear.json is created successfully.');
                        }
                    });
                    /* Writing the number of matches played per team per year matchesPerTeamPerYear.json file

                     Example Output:
                         {
                         "Team 12": {
                             "Pune Warriors": {
                                 "2011": 4,
                                 "2012": 4,
                                 "2013": 4
                             }
                         },
                         "Team 13": {
                             "Kochi Tuskers Kerala": {
                                 "2011": 6
                             }
                         },
                         "Team 14": {
                             "Rising Pune Supergiants": {
                                 "2016": 5
                             }
                         }
                     }

                     */
                    fs.writeFile(pwd + '/src/output/matchesPerTeamPerYear.json', JSON.stringify(ipl.matchesPerTeamPerYear(matches)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('matchesPerTeamPerYear.json is created successfully.');
                        }
                    });
                    // /* Writing the number of times each team won the toss and won the match too, wonTossWonMatchPerTeam.json file

                    // Example Output:
                    //     {
                    //         "Team Name": numbersofWintosswinmatch
                    //     "Rising Pune Supergiant": 5,
                    //     "Kolkata Knight Riders": 44,
                    //     "Kings XI Punjab": 28,
                    //     "Royal Challengers Bangalore": 35
                    // }

                    // */
                    fs.writeFile(pwd + '/src/output/wonTossWonMatchPerTeam.json', JSON.stringify(extra.wonTossWonMatchPerTeam(matches)) + '\n', (err) => {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            console.error('wonTossWonMatchPerTeam.json is created successfully.');
                        }
                    });
                    /* Writing the player per season who has won the highest number of player of the match in that season, playerHighManoftheMatchPerSeason.json file

                     Example Output:
                         {
                         "year": {
                             "player name": number of player of the match won
                         },
                         "2009": {
                             "YK Pathan": 3
                         },
                         "2010": {
                             "SR Tendulkar": 4
                         }
                     }
                    */
                    fs.writeFile(pwd + '/src/output/playerHighManoftheMatchPerSeason.json', JSON.stringify(extra.playerHighManoftheMatchPerSeason(matches)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('playerHighManoftheMatchPerSeason.json is created successfully.');
                        }
                    });
                    /* Writing the most economical bowler in super overs, mostEconomicalBowlerSuperOver.json file

                        Example Output:
                        "JJ Bumrah is most economical bowlers in super overs"
                    */
                    fs.writeFile(pwd + '/src/output/mostEconomicalBowlerSuperOver.json', JSON.stringify(extra.bowlerWithBestEconomyInSuperOvers(deliveries)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('mostEconomicalBowlerSuperOver.json is created successfully.');
                        }
                    });
                    /* Writing strike rate of virat kohli per season, strikeRateViratPerseason.json file
                        Example Output:
                        {
                            "Year": strikerate,
                        "2008": 105.1,
                        "2009": 112.33,
                        "2010": 144.81
                        }
                    */

                    fs.writeFile(pwd + '/src/output/strikeRateViratPerseason.json', JSON.stringify(extra.strikeRateViratPerseason(matches, deliveries)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('strikeRateViratPerseason.json is created successfully.');
                        }
                    });

                    /* Writing extra run conceded per team in the year 2016, extraRunsPerTeam.json file
                    Example Output:
                        [
                        {
                            "Team name": extra runs conceded
                        },
                        {
                            "Mumbai Indians": 102
                        },
                        {
                            "Kolkata Knight Riders": 122
                        }
                    ]
                    */
                    fs.writeFile(pwd + '/src/output/extraRunsPerTeam.json', JSON.stringify(ipl.extraRunsPerTeam(matches, deliveries, '2016')) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('extraRunsPerTeam.json is created successfully.');
                        }
                    });

                    /* Writing top economical bowlers in 2015, topEconomicalBowlers.json file

                        Example Output:
                        {
                            "Bowler name": economy,
                        "RN ten Doeschate": 4,
                        "J Yadav": 4.14,
                        "V Kohli": 5.46
                        }
                        */

                    fs.writeFile(pwd + '/src/output/topEconomicalBowlers.json', JSON.stringify(ipl.topEconomicalBowlers(matches, deliveries, '2015')) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('topEconomicalBowlers.json is created successfully.');
                        }
                    });

                    /* Writing the highest number of times a player is dismissed by another player in all season, maxNumberofTimesofDissmissal.json file

                    Example Output:
                        [Batsman name dismissed by bowler name n times]
                        ["MS Dhoni Dismissed by Z Khan 7 times"]
                    */
                    fs.writeFile(pwd + '/src/output/maxNumberofTimesofDissmissal.json', JSON.stringify(extra.playerDissmisal(deliveries)) + '\n', (err) => {
                        if (err) {
                            console.error("Opoops ! Something went wrong");
                        }
                        else {
                            console.error('maxNumberofTimesofDissmissal.json is created successfully.');
                        }
                    });
                    console.timeEnd();
                })
                .catch(err => console.error("Ooops something went wrong ... Unable to find the deliveries csv file"));
        }).catch(err => console.error("Ooops something went wrong ... Unable to find the matches csv file"));
}