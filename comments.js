// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = [];
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    if (pathname === '/index.html' || pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (pathname === '/comment') {
        const query = parsedUrl.query;
        const comment = query.comment;
        comments.push(comment);
        res.statusCode = 201;
        res.end();
    } else if (pathname === '/comments') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});
server.listen(8080);
console.log('Server running at http://localhost:8080/');