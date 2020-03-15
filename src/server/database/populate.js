const query = require('./query');

let populateMatches = (matches) => {
    let query1 = "CREATE TABLE IF NOT EXISTS matches(id integer PRIMARY KEY,season integer,city character varying(255),date date,team1 character varying(255),team2 character varying(255),toss_winner character varying(255),toss_decision character varying(255),result character varying(255),dl_applied boolean,winner character varying(255),win_by_runs integer,win_by_wickets integer,player_of_match character varying(255),venue character varying(255),umpire1 character varying(255),umpire2 character varying(255),umpire3 character varying(255));";

    query(query1)
        .then(() => {
            matches.forEach((match, index) => {
                let vals = Object.values(match);
                query("insert into matches values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)", vals)
                    .then((res) => {
                        console.log(index + 1 + " inserted into matches");
                    })
                    .catch((err) => {
                        console.log(err.stack.split("\n")[0]);
                    });
            });
        })
        .catch((err) => {
            console.log(err.stack.split("\n")[0]);
        });
}

let populateDeliveries = (deliveries) => {
    let query2 = "CREATE TABLE IF NOT EXISTS deliveries(match_id integer,inning integer,batting_team character varying(255),bowling_team character varying(255),over integer,ball integer,batsman character varying(255),non_striker character varying(255),bowler character varying(255),is_super_over boolean,wide_runs integer,bye_runs integer,legbye_runs integer,noball_runs integer,penalty_runs integer,batsman_runs integer,extra_runs integer,total_runs integer,player_dismissed character varying(255),dismissal_kind character varying(255),fielder character varying(255),CONSTRAINT fk_matches FOREIGN KEY (match_id) REFERENCES matches(id));";
    query(query2)
        .then(() => {
            deliveries.forEach((delivery, index) => {
                let deliveryvals = Object.values(delivery)
                query("insert into deliveries values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)", deliveryvals)
                    .then((res) => {
                        console.log(index + 1 + " inserted into deliveries");
                    })
                    .catch((err) => {
                        console.log(err.stack.split("\n")[0]);
                    });
            });
        })
        .catch((err) => {
            console.log(err.stack.split("\n")[0]);
        });
}

module.exports = {
    populateDeliveries,
    populateMatches
}