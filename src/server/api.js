const http = require('http');
const port = 5000;
const fs = require('fs');
const cwd = process.cwd();
const query = require('./database/query');
const ipl = require('./ipl.js');
const extra = require('./extra_deliverables.js');

// Creating server to serve the JSON outputs
const server = http.createServer((request, response) => {
    const route = request.url;
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    switch (route) {
        case '/matches-per-year':
            query('select * from matches')
                .then((matches) => {
                    let result = ipl.matchesPerYear(matches.rows);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();

                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch((err) => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/matches-per-team-per-year':
            query('select * from matches')
                .then((matches) => {
                    let result = ipl.matchesPerTeamPerYear(matches.rows);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch((err) => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/won-toss-won-match-per-team':
            query('select * from matches')
                .then((matches) => {
                    let result = extra.wonTossWonMatchPerTeam(matches.rows);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch((err) => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/player-highest-manofthematch-per-season':
            query('select * from matches')
                .then((matches) => {
                    let result = extra.playerHighManoftheMatchPerSeason(matches.rows);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch((err) => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/most-economical-bowlers-in-super-overs':
            query('select * from deliveries')
                .then((deliveries) => {
                    let result = extra.bowlerWithBestEconomyInSuperOvers(deliveries.rows);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch((err) => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/strike-rate-virat-kohli-per-season':
            query('select * from matches')
                .then((matches) => {
                    query('select * from deliveries')
                        .then((deliveries) => {
                            let result = extra.strikeRateViratPerseason(matches.rows, deliveries.rows);
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.write(JSON.stringify(result));
                            response.end();
                        })
                        .catch((err) => {
                            console.log(err.stack.split("\n")[0].split(":")[1]);
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        })
                        .catch((err) => {
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
            query('select * from matches')
                .then((matches) => {
                    query('select * from deliveries')
                        .then((deliveries) => {
                            let result = ipl.extraRunsPerTeam(matches.rows, deliveries.rows, 2016);
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.write(JSON.stringify(result));
                            response.end();
                        })
                        .catch((err) => {
                            console.log(err.stack.split("\n")[0].split(":")[1]);
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        })
                        .catch((err) => {
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
                .catch((err) => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/top-economical-bowlers':
            query('select * from matches')
                .then((matches) => {
                    query('select * from deliveries;')
                        .then((deliveries) => {
                            let result = ipl.topEconomicalBowlers(matches.rows, deliveries.rows, 2015);
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.write(JSON.stringify(result));
                            response.end();
                        })
                        .catch((err) => {
                            console.log(err.stack.split("\n")[0].split(":")[1]);
                            response.writeHead(500);
                            response.write("Internal Server Error");
                            response.end();
                        })
                        .catch((err) => {
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
                .catch((err) => {
                    console.error("Unexpected Error");
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                });
            break;
        case '/max-numberoftimes-dissmissal':
            query('select * from deliveries')
                .then((deliveries) => {
                    let result = extra.playerDissmisal(deliveries.rows);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(result));
                    response.end();
                })
                .catch((err) => {
                    console.log(err.stack.split("\n")[0].split(":")[1]);
                    response.writeHead(500);
                    response.write("Internal Server Error");
                    response.end();
                })
                .catch((err) => {
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
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404, "Page not found", { 'Content-Type': 'text/plain' });
            response.write(response.statusMessage);
            response.end();
    }

});

server.listen(port, () => {
    console.log(`API Server is running at http://localhost:${port}/`);
});