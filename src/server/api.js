const http = require('http');
const port = 5000;
const fs = require('fs');
const cwd = process.cwd();
const { client, dbconnect } = require('./database/connect.js');
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');

dbconnect();

// Creating server to serve the JSON outputs
const server = http.createServer((request, response) => {
    const route = request.url;
    switch (route) {
        case '/matches-per-year':
            client
                .query('select * from matches;')
                .then((matches) => {
                    let result = ipl.matchesPerYear(matches.rows);
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();

                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                    client.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/matches-per-team-per-year':
            client
                .query('select * from matches;')
                .then((matches) => {
                    let result = ipl.matchesPerTeamPerYear(matches.rows);
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/won-toss-won-match-per-team':
            client
                .query('select * from matches;')
                .then((matches) => {
                    let result = extra.wonTossWonMatchPerTeam(matches.rows);
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/player-highest-manofthematch-per-season':
            client
                .query('select * from matches;')
                .then((matches) => {
                    let result = extra.playerHighManoftheMatchPerSeason(matches.rows);
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/most-economical-bowlers-in-super-overs':
            client
                .query('select * from deliveries;')
                .then((deliveries) => {
                    let result = extra.bowlerWithBestEconomyInSuperOvers(deliveries.rows);
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/strike-rate-virat-kohli-per-season':
            client
                .query('select * from matches;')
                .then((matches) => {
                    client.query('select * from deliveries;')
                        .then((deliveries) => {
                            let result = extra.strikeRateViratPerseason(matches.rows, deliveries.rows);
                            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                            response.write(JSON.stringify(result));
                            response.end();
                        })
                        .catch((err) => {
                            console.log(err.stack.split("\n")[0].split(":")[1]);
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        })
                        .catch(() => {
                            console.error("Unexpected Error");
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        });
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/extra-runs-per-team':
            client
                .query('select * from matches;')
                .then((matches) => {
                    client.query('select * from deliveries;')
                        .then((deliveries) => {
                            let result = ipl.extraRunsPerTeam(matches.rows, deliveries.rows, 2016);
                            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                            response.write(JSON.stringify(result));
                            response.end();
                        })
                        .catch((err) => {
                            console.log(err.stack.split("\n")[0].split(":")[1]);
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        })
                        .catch(() => {
                            console.error("Unexpected Error");
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        });
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/top-economical-bowlers':
            client
                .query('select * from matches;')
                .then((matches) => {
                    client.query('select * from deliveries;')
                        .then((deliveries) => {
                            let result = ipl.topEconomicalBowlers(matches.rows, deliveries.rows, 2015);
                            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                            response.write(JSON.stringify(result));
                            response.end();
                        })
                        .catch((err) => {
                            console.log(err.stack.split("\n")[0].split(":")[1]);
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        })
                        .catch(() => {
                            console.error("Unexpected Error");
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        });
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/max-numberoftimes-dissmissal':
            client
                .query('select * from deliveries;')
                .then((deliveries) => {
                    let result = extra.playerDissmisal(deliveries.rows);
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch(() => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/':
        case '/api.html':
        case '/api':
            fs.readFile(cwd + '/src/public/api.html', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("File Not Found !");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404, "Page not found", { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain' });
            response.write(response.statusMessage);
            response.end();
    }

});

server.listen(port, () => {
    console.log(`API Server is running at http://localhost:${port}/`);
});