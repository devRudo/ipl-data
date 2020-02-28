const http = require('http');
const path = require('path');
const localhost = '127.0.0.1';
const port = 3000;
const fs = require('fs');
const cwd = process.cwd();

const outputpath = path.join(cwd + '/src/output/');
const server = http.createServer((request, response) => {
    const route = request.url;
    // console.log(route.split('/')[1]);
    switch (route) {
        case '/matches-per-year':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'matchesPerYear.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found !");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/matches-per-team-per-year':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'matchesPerTeamPerYear.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("no data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/won-toss-won-match-per-team':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'wonTossWonMatchPerTeam.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("no data found");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/player-highest-manofthematch-per-season':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'playerHighManoftheMatchPerSeason.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("no data found");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/most-economical-bowlers-in-super-overs':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'mostEconomicalBowlerSuperOver.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found !");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/strike-rate-virat-kohli-per-season':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'strikeRateViratPerseason.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/extra-runs-per-team':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'extraRunsPerTeam.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/top-economical-bowlers':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'topEconomicalBowlers.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/max-numberoftimes-dissmissal':
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
            fs.readFile(outputpath + 'maxNumberofTimesofDissmissal.json', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/':
        case '/index.html':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/index.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/main.js':
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            fs.readFile(cwd + '/src/public/main.js', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result1':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res1.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result2':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res2.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result3':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res3.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result4':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res4.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result5':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res5.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result6':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res6.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result7':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res7.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result8':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res8.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/result9':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile(cwd + '/src/public/res9.html', 'utf8', (err, data) => {
                if (err) {
                    response.end("No data found!");
                }
                else {
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

server.listen(port, localhost, () => {
    console.log(`Server is running at http://${localhost}:${port}/`);
});