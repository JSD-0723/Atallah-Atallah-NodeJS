const http = require('http');
const path = require('path');
const { writeFile } = require('fs/promises');
const { format } = require('date-fns');

const filePath = path.join(__dirname, 'requests.txt');

async function writeToFile(filePath, data) {
    try {
        await writeFile(filePath, data, { flag: 'a' });
        console.log(`Appended data to ${filePath}`);
    } catch (error) {
        console.error(`Got an error trying to write the file: ${error.message}`);
    }
}

const server = http.createServer((req, res) => {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const request = `${timestamp} - ${req.method} ${req.url}\n`;

    // Handle different types of requests
    if (req.method === "GET" || req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
        writeToFile(filePath, request);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`${req.method} request logged.\n`);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Unsupported request method.\n');
    }
});

server.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});