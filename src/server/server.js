const http = require('http');
const port = 3000;
const fs = require('fs');
const cwd = process.cwd();

//Creating server to serve web pages
const server = http.createServer((request, response) => {
    const route = request.url;
    // differnet routes
    switch (route) {
        case '/':
        case '/index.html':
            fs.readFile(cwd + '/src/public/index.html', 'utf8', (err, data) => {
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
        case '/main.js':
            fs.readFile(cwd + '/src/public/main.js', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404, "File not found !", { 'Content-Type': 'text/plain' });
                    response.end("File Not Found !");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case '/style.css':
            fs.readFile(cwd + '/src/public/style.css', 'utf8', (err, data) => {
                if (err) {
                    response.writeHead(404);
                    response.end("File Not Found !");
                }
                else {
                    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/css' });
                    response.write(data);
                    response.end();
                }
            });
            break;
        // Routes for highcharts
        case '/result1':
        case '/result2':
        case '/result3':
        case '/result4':
        case '/result5':
        case '/result6':
        case '/result7':
        case '/result8':
        case '/result9':
            fs.readFile(cwd + '/src/public/result.html', 'utf8', (err, data) => {
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
        // if Route not defined
        default:
            response.writeHead(404, "<h1>Page not found</h1>", { 'Content-Type': 'text/html' });
            response.write(response.statusMessage);
            response.end();
    }

});

// listening to the server on the port
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});