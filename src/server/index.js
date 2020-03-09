const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const pwd = process.cwd();
const { Pool } = require('pg');
require('dotenv').config();
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');
const outputPath = path.join(pwd + '/src/output/');
const matchesFilePath = path.join(pwd + '/src/data/matches.csv');
const deliveriesFilePath = path.join(pwd + '/src/data/deliveries.csv');

const pool = new Pool({
    max: 70
});

// Function to insert matches and deliveries data to postgres
let populateDB = (matches, deliveries) => {
    let query1 = "CREATE TABLE IF NOT EXISTS matches(id integer PRIMARY KEY,season integer,city character varying(255),date date,team1 character varying(255),team2 character varying(255),toss_winner character varying(255),toss_decision character varying(255),result character varying(255),dl_applied boolean,winner character varying(255),win_by_runs integer,win_by_wickets integer,player_of_match character varying(255),venue character varying(255),umpire1 character varying(255),umpire2 character varying(255),umpire3 character varying(255));";
    let query2 = "CREATE TABLE IF NOT EXISTS deliveries(match_id integer,inning integer,batting_team character varying(255),bowling_team character varying(255),over integer,ball integer,batsman character varying(255),non_striker character varying(255),bowler character varying(255),is_super_over boolean,wide_runs integer,bye_runs integer,legbye_runs integer,noball_runs integer,penalty_runs integer,batsman_runs integer,extra_runs integer,total_runs integer,player_dismissed character varying(255),dismissal_kind character varying(255),fielder character varying(255),CONSTRAINT fk_matches FOREIGN KEY (match_id) REFERENCES matches(id));";
    pool.connect()
        .then((client) => {
            client
                .query(query1)
                .then(() => {
                    pool.connect()
                        .then((client) => {
                            client
                                .query(query2)
                                .then(() => {
                                    matches.forEach((match) => {
                                        pool.connect()
                                            .then((client) => {
                                                let vals = Object.values(match);
                                                client.query("insert into matches values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)", vals)
                                                    .then((res) => {
                                                        // console.log("done");
                                                    })
                                                    .catch((err) => {
                                                        console.log(err.stack.split("\n")[0]);
                                                    })
                                                    .finally(() => {
                                                        client.release();
                                                    });
                                            })
                                            .catch((err) => {
                                                console.log(err.stack.split("\n")[0]);
                                            });
                                    });
                                    deliveries.forEach((delivery) => {
                                        pool.connect()
                                            .then((client) => {
                                                let deliveryvals = Object.values(delivery)
                                                client.query("insert into deliveries values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)", deliveryvals)
                                                    .then((res) => {
                                                        // console.log("done");
                                                    })
                                                    .catch((err) => {
                                                        console.log(err.stack.split("\n")[0]);
                                                    })
                                                    .finally(() => {
                                                        client.release();
                                                    });
                                            })
                                            .catch((err) => {
                                                console.log(err.stack.split("\n")[0]);
                                            });
                                    });
                                })
                                .catch((err) => {
                                    console.log(err.stack);
                                })
                                .finally(() => {
                                    client.release();
                                });
                        })
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0]);
                })
                .finally(() => {
                    client.release();
                });
        });
}

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
            csv({
                checkType: true
            }).fromFile(deliveriesFilePath)
                .then((deliveries) => {
                    // Insterting  all matches and delivery data into postgres
                    populateDB(matches, deliveries);

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

